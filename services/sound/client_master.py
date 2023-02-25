import socket
import sys
import json 
import threading, wave, pyaudio, time, queue

port = 9633
bufferSize = 65536
ip = sys.argv[1]
q = queue.Queue(maxsize=2000)
# chunk = 10*1024
chunk = 1024
p = pyaudio.PyAudio()

def getAudioData():
    while True:
        frame,_= sock.recvfrom(bufferSize)
        q.put(frame)
        print('Queue size...',q.qsize())

msgFromClient = {"value":sys.argv[2]}
bytesToSend = json.dumps(msgFromClient).encode()

serverAddressPort = (sys.argv[1], port)
# Create a socket at client side
try:
    sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET,socket.SO_RCVBUF,bufferSize)
except socket.error as err:
    print('Socket error because of %s' %(err))


stream = p.open(
    format=p.get_format_from_width(2),
    channels=1,
    rate=22050,
    output=True,
    frames_per_buffer=chunk
)
# create socket
message = b'Hello'
sock.sendto(message,(ip,port))
socket_address = (ip,port)

t1 = threading.Thread(target=getAudioData, args=())
t1.start()
time.sleep(1)

print('Now Playing...')
while True:
    frame = q.get()
    stream.write(frame)

sock.close()



