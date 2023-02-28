import graphviz
import json

with open('../../manager/server/diagram.json') as f:
  diagram = json.loads(f.read())


g = graphviz.Digraph('G', filename='../client/src/assets/diagram.gv',format='png', node_attr={'shape': 'record'}, engine='fdp')

id = 0
for device in diagram: 
  id += 1
  with g.subgraph(name='cluster'+device["device"]) as a:
    a.attr(color='blue', label='cluster_'+device["device"]+'_'+str(device["voltage"])+'V'+'_'+str(device["amperage"])+'A')
    a.node(device["device"], style='filled', fillcolor='cyan')
    if device['communication'] == 'uart':
      a.node(device['service']+'_'+str(id), style='filled', fillcolor='brown')
    else :
      a.node(device['service']+'_'+str(id), style='filled', fillcolor='darkgreen')
    a.edge(device["device"], device['service']+'_'+str(id), label=device['communication'],len='2.0')

g.view()