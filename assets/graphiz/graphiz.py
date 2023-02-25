import graphviz
import json

# with open('../../config/devices.json') as f:
#   devices_contents = f.read()
# devices = json.loads(devices_contents)

with open('../../config/scenarios.json') as f:
  scenarios_contents = f.read()
scenarios = json.loads(scenarios_contents)

g = graphviz.Graph('G', filename='diagram.gv')

for scenario in scenarios:
  for item in scenario["scenario"]:
    print(item)
    g.edge(item["device"], item["function"], label=item['arg'])
  print("dede")

g.view()