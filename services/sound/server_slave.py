import socket
import sys
import json
import os
import threading, wave, pyaudio, time

port = 9633
bufferSize = 65536
ip = sys.argv[1]
chunk = 10*1024
wf = wave.open("../../assets/file_example.wav")
p = pyaudio.PyAudio()

# Create a datagram socket
sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET,socket.SO_RCVBUF,bufferSize)
print("Socket created ...")
# Bind to address and ip
sock.bind((ip, port))
print("Server up and listening on : "+ip+" / "+str(port))
print('server listening at',(ip, (port)),wf.getframerate())
stream = p.open(
    format=p.get_format_from_width(wf.getsampwidth()),
    channels=wf.getnchannels(),
    rate=wf.getframerate(),
    input=True,
    frames_per_buffer=chunk
)
data = None
sample_rate = wf.getframerate()
# Listen for incoming datagrams
msg = str.encode("Hello Client!")
while True:
        msg,address = sock.recvfrom(bufferSize)
        print('Message from Client >> {}'.format(msg))
        print('Client IP Address:{}'.format(address))
        while True:
            data = wf.readframes(chunk)
            sock.sendto(data,address)
            # time.sleep(0.8*chunk/sample_rate)
            time.sleep(0.2*chunk/sample_rate)
        
        sock.sendto(msg,address)