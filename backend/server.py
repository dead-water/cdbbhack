from itertools import product
from math import prod
from flask import Flask, request, jsonify
import ifcopenshell
from ifcopenshell.util import element
import matplotlib.pyplot as plt

app = Flask(__name__)
import json

# ifc stuff
m = ifcopenshell.open("data/sama.ifc")
project = m.by_type("IfcProject")
print ( project)



def find_material(product, type_x):
    print('s')

# process products
products = m.by_type("IfcProduct")#
product_sets = {}
product_types = ['IFCWALLSTANDARDCASE', 'IFCDOOR', 'IFCPLATE', 'IFCSLAB', 'IFCRAILING', 'IFCCOLUMN', 'IFCMEMBER']
metadata_fields = ['product', 'materials', 'volume', 'co2']

# collect element quantitites 
def print_quantities(property_definition):
  if 'IfcElementQuantity' == property_definition.is_a():
    for quantity in property_definition.Quantities:
      if 'IfcQuantityArea' == quantity.is_a():
        print('Area value: ' + str(quantity.AreaValue))
      if 'IfcQuantityVolume' == quantity.is_a():
        print('Volume value: ' + str(quantity.VolumeValue))
      if 'IfcQuantityLength' == quantity.is_a():
        print('Length value: ' + str(quantity.LengthValue))

        
for type_x in product_types:
    product_sets[type_x] = []

#sort product by type
count_none = 0
count = 0
unique_mat = {}
for product in products:
    for type_x in product_sets:
        if product.is_a(type_x):
            
            #create dict for product metadata
            product_dict = {}
            #product_dict['product'] = product

            # get materials
            el = element.get_material(product)
            if el is None:
                product_dict['materials'] = None
                count += 1
                count_none += 1
            if el is not None and el.is_a('IfcMaterialLayer') == False:
                if el.is_a('IfcMaterialList'):
                    product_dict['materials'] = []
                    count += 1
                    for e in el:
                        for i in e:
                            #print(i[0])
                            print(type(str(i[0])))
                            product_dict['materials'].append(str(i[0]))
                            
                            if str(i[0]) in unique_mat:
                                unique_mat[str(i[0])] += 1
                            else:
                                unique_mat[str(i[0])] = 1
                else:
                    if el.is_a('ifcMaterial'):
                        count += 1
                        product_dict['materials'] = [str(el[0])]
                        if str(el[0]) in unique_mat:
                            unique_mat[str(el[0])] += 1
                        else:
                            unique_mat[str(el[0])] = 1
                #print(product_dict['materials'])

            # get quant
   
            product_sets[type_x].append(product_dict)
print(unique_mat)
with open('data.json', 'w') as f:
    json.dump(product_sets, f)

# analysis
print(count)
print(count_none)



for type_x in product_sets:
    print (type_x, len(product_sets[type_x]))

print(product_sets['IFCWALLSTANDARDCASE'][0])


@app.route('/get_data', methods=['POST', 'OPTIONS'])
def get_data():
    return('hello')

# run server
if __name__ == '__main__':
    app.run(debug=True, port=5000)