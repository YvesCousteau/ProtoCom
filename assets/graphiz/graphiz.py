import graphviz
import json

with open('../../config/scenarios.json') as f:
  scenarios_contents = f.read()
scenarios = json.loads(scenarios_contents)

with open('../../config/devices.json') as f:
  devices_contents = f.read()
devices = json.loads(devices_contents)

with open('../../config/functions.json') as f:
  functions_contents = f.read()
functions = json.loads(functions_contents)


g = graphviz.Graph('G', filename='../../assets/diagram.gv', engine='dot',node_attr={'shape': 'record'})

for function in functions:
  g.node(function["name"], style='filled', fillcolor='brown')

for device in devices:
  g.node(device["name"], style='filled', fillcolor='cyan')
  for item in device["functions"]:
    for function in functions:
      if item == function["name"]:
        g.edge(device["name"], item, label=function['com'],)

g.view()