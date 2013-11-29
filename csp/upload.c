#include "gwan.h" // G-WAN exported functions
#include <string.h>
#include <stdio.h>
#include <malloc.h>

int main(int argc, char *argv[])
{
  xbuf_t *reply = (xbuf_t *)get_reply(argv)
       , *read_xbuf = (xbuf_t *)get_env(argv, READ_XBUF);
  char *file   = (char*)get_env(argv, REQ_ENTITY)
     , *filename = xbuf_findstr(read_xbuf, "X-File-Name")
     , *www, *new_filename;
  u32  cont_len  = (u32)  get_env(argv, CONTENT_LENGTH);

  filename = &filename[13]; // X-File-Name: icon1.png\r\n
  filename = strndup(filename, (int)(strstr(filename, "\r\n") - filename));

  www = (char *)get_env(argv, WWW_ROOT);
  new_filename = malloc(256);
  unescape_html((u8 *)filename);
  sprintf(new_filename, "%s/uploaded/%s", www, filename);

  FILE *fp = fopen(new_filename, "wb");
  fwrite(file, cont_len, 1, fp);
  fflush(fp);
  fclose(fp);

  free(filename); filename = NULL;
  xbuf_cat(reply, "File uploaded.");
  return 200;
}
