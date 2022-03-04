from itertools import product
from math import prod
from flask import Flask, request, jsonify
import ifcopenshell

app = Flask(__name__)

# ifc stuff
m = ifcopenshell.open("data/sama.ifc")
project = m.by_type("IfcProject")
print ( project)

def find_material(product, type):
    print()

# process relationships
# material_relationships = []
# relationships = m.by_type("IfcRelationship")
# for rel in relationships:
#     if rel.is_a('IfcRelAssociatesMaterial'):




# process products
products = m.by_type("IfcProduct")#
product_sets = {}
product_types = ['IFCWALLSTANDARDCASE', 'IFCDOOR', 'IFCPLATE', 'IFCSLAB', 'IFCRAILING', 'IFCCOLUMN', 'IFCMEMBER', 'IFCRELASSOCIATESMATERIAL']
metadata_fields = ['product', 'material', 'volume', 'co2']

for type in product_types:
    product_sets[type] = []

#sort product by type
for product in products:
    for type in product_sets:
        if product.is_a(type):
            
            #create dict for product metadata
            product_dict = {}
            product_dict['product'] = product
            print(ifcopenshell.util.element.get_material(product, should_skip_usage=True))


            product_sets[type].append(product_dict)



for type in product_sets:
    print (type, len(product_sets[type]))

print(product_sets['IFCWALLSTANDARDCASE'][0])




@app.route('/get_data', methods=['POST', 'OPTIONS'])
def get_data():
    return('hello')

# run server
if __name__ == '__main__':
    app.run(debug=True, port=5000)