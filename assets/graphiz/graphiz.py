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


g = graphviz.Digraph('G', filename='../client/src/assets/diagram.gv',format='png', node_attr={'shape': 'record'}, engine='fdp')

i = 0
for device in devices:
  i += 1
  with g.subgraph(name='cluster'+device["name"]) as a:
      a.attr(color='blue', label='cluster_'+device["name"]+'_'+device["voltage"]+'V'+'_'+device["amperage"]+'A')
      a.node(device["name"], style='filled', fillcolor='cyan')
      for item in device["functions"]:
            for function in functions:
              if item == function["name"]:
                  if function['com'] == 'uart':
                    a.node(item+'_'+str(i), style='filled', fillcolor='brown')
                  else :
                     a.node(item+'_'+str(i), style='filled', fillcolor='darkgreen')
                  a.edge(device["name"], item+'_'+str(i), label=function['com'],len='2.0')

for device in devices:
   g.edge('clusterManager', 'cluster'+device["name"], label='udp',len='10.0')

g.view()