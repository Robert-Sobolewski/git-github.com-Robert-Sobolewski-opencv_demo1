
import base64
import numpy as np
import cv2
import sys

im_bytes = sys.argv[1]
# im_bytes = base64.b64encode(im_bytes)
# im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
# img = cv2.imdecode(im_arr,flags=cv2.IMREAD_COLOR)
with open('bkp.txt','wb') as outfile:
    outfile.write(im_bytes)
print('111')
# return to base64
# im_by = im_arr.tobytes()
# im_by64 = base64.b64encode(im_by)
# print('111')
# print(im_by64)