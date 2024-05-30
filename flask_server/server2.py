from flask import Flask, request, json, jsonify, redirect, url_for
import mgrs
from flask_cors import CORS
import psycopg2
from collections import defaultdict

app = Flask(__name__)
PORT = 5000
CORS(app)

app.run(debug=True)

m = mgrs.MGRS()


@app.route('/api/simpler', methods=["POST"])
def simpler():

    jsonData = request.get_json()

    c = m.toMGRS(jsonData['latitude'],jsonData['longitude'])

    conn = psycopg2.connect(database="postgres", 
                            user="omnifederal", 
                            password="root", 
                            host="localhost", port="5432") 
  
    cur = conn.cursor() 
  
    # Get the data from the form 
    Lat = jsonData['latitude'] 
    Lon = jsonData['longitude'] 
    milGRS = c
  
        # Insert the data into the table
    cur.execute("INSERT INTO just_mgrs (miliData) VALUES (%s)", (milGRS,))

    # Fetch the inserted data
    cur.execute("SELECT miliData FROM just_mgrs")

    rows = cur.fetchall()
    data_list = [row[0] for row in rows]  # Extracting the first element of each row
    
    # Convert array to dictionary with indices as keys
    result_dict = dict(zip(range(1, len(data_list)+1), data_list))
    #print(result_dict)
    sendJson = json.dumps(result_dict)
    #print(sendJson)

    # commit the changes 
    conn.commit() 
  
    # close the cursor and connection 
    cur.close() 
    conn.close() 

    return sendJson



if __name__ == '__main__':
    app.run(port=PORT)