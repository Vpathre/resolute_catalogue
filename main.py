from flask import Flask, jsonify, request, json, render_template
from flask_cors import CORS
import requests
import time

apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2ODgzMzU0MSwidWlkIjoyNjgwODE4OSwiaWFkIjoiMjAyMi0wNy0wNVQxNDo0NDo0NC40OTlaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTA3NjA0OTksInJnbiI6InVzZTEifQ.W0cueydwoC_nw4G-8DK4E7Bn93rqafiPcpo86f63988"
apiUrl = "https://api.monday.com/v2"
headers = {"Authorization": apiKey}

Lite_package = "The Lite package that you selected means that your school will get a basic implementation which includes student licenses, student guides and books, curriculum & teaching plans, and basic support."
Standard_package = "The Standard package that you selected means that your school will have full access to our platform and curriculum, as well as 5% discount on kits and 15% discount on teacher training."
Premium_package = "The Premium package that you selected means that your school will have full access to our platform and curriculum, as well as 10% discount on kits and 50% discount on teacher training. You will also receive a free STEAM day and tech-talk for your school!"

# creating a Flask app
app = Flask(__name__)
CORS(app)
print("> server running at http://localhost:5000")


def log(text):
    f = open("log.txt", "a")
    f.write(text+"\n")
    f.close()


def print_values(content):
    print(content['name'])
    print(content['designation'])
    print(content['school_name'])
    print(content['email'])
    print(content['phone'])
    print(content['package'])
    print('-----------------------')
    print('Novice kits:'+content['Novice'])
    print('Apprentice kits:'+content['Apprentice'])
    print('Adept kits:'+content['Adept'])
    print('Beginner kits:'+content['Beginner'])
    print('Advanced kits:'+content['Advanced'])
    print('Master kits:'+content['Master'])


def updateMonday(content):
    package = content['package']
    client_name = content['name']
    designation = content['designation']
    school_name = content['school_name']
    email = content['email']
    phone = content['phone']
    stream_options = ''
    sales_summary = ''
    streams_to_buy = {
        'Novice': int(content['Novice']),  # 1
        'Apprentice': int(content['Apprentice']),  # 2
        'Adept': int(content['Adept']),  # 3
        'Beginner': int(content['Beginner']),  # 4
        'Advanced': int(content['Advanced']),  # 5
        'Master': int(content['Master'])  # 6
    }
    if streams_to_buy["Novice"] > 0:
        sales_summary += "Purchased " + \
            str(streams_to_buy["Novice"])+" Novice kits @ 2300 each\n"
        stream_options += "1,"
    if streams_to_buy["Apprentice"] > 0:
        sales_summary += "Purchased " + \
            str(streams_to_buy["Apprentice"])+" Apprentice kits @ 2415 each\n"
        stream_options += "2,"
    if streams_to_buy["Adept"] > 0:
        sales_summary += "Purchased " + \
            str(streams_to_buy["Adept"])+" Adept kits @ 2530 each\n"
        stream_options += "3,"
    if streams_to_buy["Beginner"] > 0:
        sales_summary += "Purchased " + \
            str(streams_to_buy["Beginner"])+" Beginner kits @ 2645 each\n"
        stream_options += "4,"
    if streams_to_buy["Advanced"] > 0:
        sales_summary += "Purchased " + \
            str(streams_to_buy["Advanced"])+" Advanced kits @ 2875 each\n"
        stream_options += "5,"
    if streams_to_buy["Master"] > 0:
        sales_summary += "Purchased " + \
            str(streams_to_buy["Master"])+" Master kits @ 3540 each\n"
        stream_options += "6,"
    if stream_options[-1] == ",":
        stream_options = stream_options[:-1]
    package_cost = 0
    package_description = ""
    package_discount = 0
    Teacher_training_cost = 0

    if package == 'Lite':
        package_cost = 34500
        package_description = Lite_package
        package_discount = 1
        Teacher_training_cost = 13800
    elif package == 'Standard':
        package_cost = 69000
        package_description = Standard_package
        package_discount = 0.95
        Teacher_training_cost = 0.85 * 13800
    elif package == 'Premium':
        package_cost = 109250
        package_description = Premium_package
        package_discount = 0.9
        Teacher_training_cost = 0.5 * 13800

    Novice_kit_cost = streams_to_buy["Novice"]*2300
    Apprentice_kit_cost = streams_to_buy["Apprentice"]*2415
    Adept_kit_cost = streams_to_buy["Adept"]*2530
    Beginner_kit_cost = streams_to_buy["Beginner"]*2645
    Advanced_kit_cost = streams_to_buy["Advanced"]*2875
    Master_kit_cost = streams_to_buy["Master"]*3450
    kits_cost = Novice_kit_cost+Apprentice_kit_cost+Adept_kit_cost + \
        Beginner_kit_cost+Advanced_kit_cost+Master_kit_cost
    Total_kits_cost = package_discount*kits_cost
    Proposal_cost = package_cost + Total_kits_cost + Teacher_training_cost

    query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:2944206627, item_name:$myItemName, column_values:$columnVals) { id } }'
    vars = {
        'myItemName': client_name,  # CLient name
        'columnVals': json.dumps({
            'text9': designation,  # Designation
            'status': {'label': package},  # Package
            'text': school_name,  # School name
            'email': {'email': email, 'text': email},  # clients email adress
            # Phone number
            'phone': {'phone': phone, 'countryShortName': 'ZA'},
            # Which streams would you like (1:Novice , 2:Apprentice, 3:Adept, 4:Beginner, 5:Advanced, 6:Master)
            'dropdown4': stream_options,
            # number of Master kits client wants to buy
            'numbers_10': streams_to_buy["Master"],
            # number of Advanced kits client wants to buy
            'numbers_18': streams_to_buy["Advanced"],
            # number of Beginner kits client wants to buy
            'numbers_164': streams_to_buy["Beginner"],
            # number of Adept kits client wants to buy
            'numbers_11': streams_to_buy["Adept"],
            # number of Apprentice kits client wants to buy
            'numbers_16': streams_to_buy["Apprentice"],
            # number of Novice kits client wants to buy
            'numbers_1': streams_to_buy["Novice"],
            'numbers0': Novice_kit_cost,  # cost of Novice kit boxes
            'numbers8': Apprentice_kit_cost,  # cost of Apprentice kit boxes
            'numbers3': Adept_kit_cost,  # cost of Adept kit boxes
            'numbers33': Beginner_kit_cost,  # cost of Beginner kit boxes
            'numbers03': Advanced_kit_cost,  # cost of Advanced kit boxes
            'numbers4': Master_kit_cost,  # cost of Master kit boxes
            'numbers': package_cost,  # cost of package selceted
            'long_text': package_description,  # package description
            'numbers6': Proposal_cost,  # Full Proposal cost
            'numbers7': Teacher_training_cost,  # teacher training cost
            'numbers1': Total_kits_cost,  # cost of all kits
            'long_text6': sales_summary  # summary of purchase for email
        })
    }
    data = {'query': query5, 'variables': vars}
    r = requests.post(url=apiUrl, json=data, headers=headers)  # make request


@app.route('/')
def home():
    return render_template('index.html')

# invoicing_system


@app.route('/salesrequest', methods=['GET', 'POST'])
def create_invoice():
    if(request.method == 'GET'):
        data = "Does not accept GET request"
        return jsonify({'data': data})
    if(request.method == 'POST'):
        content = request.json
        try:
            print_values(content)
            localtime = time.asctime(time.localtime(time.time()))
            print("Sales invoice request came from " +
                  request.remote_addr+" at "+localtime)
            log("Sales invoice request came from " +
                request.remote_addr+" at "+localtime)
            updateMonday(content)
            print(data)
            return jsonify({'data': 'recieved'})
        except (ValueError, KeyError, TypeError):
            print(data)
            return jsonify({'data': 'JSON format error'})

# 404 eror response handling


@app.errorhandler(404)
def page_not_found(e):
    data = "404"
    return jsonify({'data': data})


if __name__ == '__main__':
    app.run()
