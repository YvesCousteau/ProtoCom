import socket
import sys
import json
import os
import threading, wave, pyaudio, time, queue

port = 9633
bufferSize = 65536
ip = sys.argv[1]
chunk = 1024
p = pyaudio.PyAudio()
q = queue.Queue(maxsize=2000)

def getAudioData():
    while True:
        frame,_= sock.recvfrom(bufferSize)
        q.put(frame)
        print('Queue size...',q.qsize())

def getMessage():
    while True:
        bytesAddressPair = sock.recvfrom(1024)
        message = json.loads(bytesAddressPair[0].decode())
        print("WWWWWWWWWWWWWWWWWW"+message)
        

# Create a datagram socket
sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET,socket.SO_RCVBUF,bufferSize)
print("Socket created ...")
# Bind to address and ip
sock.bind((ip, port))
print("Server up and listening on : "+ip+":"+str(port))


msg = str.encode("Hello Client!")


stream = p.open(
    format=p.get_format_from_width(2),
    channels=1,
    rate=22050,
    output=True,
    frames_per_buffer=chunk
)

t1 = threading.Thread(target=getAudioData, args=()).start()
t2 = threading.Thread(target=getMessage, args=()).start()
time.sleep(1)

print('Now Playing...')
while True:
    frame = q.get()
    stream.write(frame)
    
