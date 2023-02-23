import socket
import sys
import json
import os
from pynput.keyboard import Key, Controller

port = 20003
bufferSize = 1024
ip = sys.argv[1]

# Create a datagram socket
sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
print("Socket created ...")
# Bind to address and ip
sock.bind((ip, port))
print("Server up and listening on : "+ip+":"+str(port))
# Listen for incoming datagrams

msg = str.encode("Hello Client!")

while(True):
    bytesAddressPair = sock.recvfrom(bufferSize)
    message = json.loads(bytesAddressPair[0].decode())
    address = bytesAddressPair[1]
    clientMsg = "Message from Client >> {}".format(message)
    clientIP  = "Client IP Address:{}".format(address)
    print(clientMsg)
    print(clientIP)
    if message["value"] == "powerView":
        keyboard = Controller()
        keyboard.press("y")
        keyboard.release("y")
    if message["value"] == "carView":
        keyboard = Controller()
        keyboard.press("u")
        keyboard.release("u")
    if message["value"] == "positionView":
        keyboard = Controller()
        keyboard.press("i")
        keyboard.release("i")
    if message["value"] == "musicView":
        keyboard = Controller()
        keyboard.press("o")
        keyboard.release("o")
    if message["value"] == "contactView":
        keyboard = Controller()
        keyboard.press("p")
        keyboard.release("p")
    if message["value"] == "decreaseSound":
        keyboard = Controller()
        keyboard.press("minus")
        keyboard.release("minus")
    if message["value"] == "increaseSound":
        keyboard = Controller()
        keyboard.press("equals")
        keyboard.release("equals")
    if message["value"] == "previousSound":
        keyboard = Controller()
        keyboard.press("alpha 2")
        keyboard.release("alpha 2")
    if message["value"] == "nextMusic":
        keyboard = Controller()
        keyboard.press("alpha 3")
        keyboard.release("alpha 3")
    if message["value"] == "runSound":
        keyboard = Controller()
        keyboard.press("alpha 4")
        keyboard.release("alpha 4")

    # Sending a reply to client
    sock.sendto(msg,address)
    
    

