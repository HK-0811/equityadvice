from flask import Flask,request
from stock_pred_tool import calculatePrediction
import csv
import re
from datetime import date, timedelta # Date Functions


app = Flask(__name__)

@app.route('/home')
def home():
    return {'price':5000,'stock':'adani'}
    
@app.route('/predict/<stock>/<fd>/<td>')
def prediction(stock,fd,td):
    print(fd)
    print(td)
    data = calculatePrediction(stock)
    # print(data)
    return data

@app.route('/tickets/<name>')
def gettikcets(name):
     # opening the CSV file
    output = []
    with open('./symbols.csv', mode ='r') as file:
        # reading the CSV file
        csvFile = csv.reader(file)
        
        # displaying the contents of the CSV file
        for lines in csvFile:
            x = re.search(f"^{name.lower()}*", lines[1].lower())
            if x:
                output.append({'tik':lines[0],'name':lines[1]})
    return {'data':output}
  

if __name__ == "__main__":
    app.run(debug=True)