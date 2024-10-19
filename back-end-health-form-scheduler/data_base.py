from compare_data import checker_value_to_insert
import pymongo


def check_value_unexist(value_to_check):
    client = pymongo.MongoClient("mongodb://localhost:27019/")
    db = client['health-form-scheduler']
    collection = db['table']

    
    field_name = 'time_milliseconds'

    
    item = collection.find_one({field_name: value_to_check})

    if item:        
        return False    
    return True


def getItems():
    client = pymongo.MongoClient('mongodb://localhost:27019/')
    db = client['health-form-scheduler']
    collection = db['table']    
    result = collection.find({'time_milliseconds': {'$exists': True}})
    value_return = {'status': True}
    data_to_return = []

    for document in result:
        data_to_return += [ document['time_milliseconds'] ]
    
    value_return['value'] = data_to_return
    return value_return


def insert_item(value_to_insert):
    can_insert_value = checker_value_to_insert(value_to_insert)
    time_milliseconds = value_to_insert['time_milliseconds']
    value_unexist = check_value_unexist(time_milliseconds)

    value_return = {'status': False}
    
    if can_insert_value == True and value_unexist == True:
        client = pymongo.MongoClient("mongodb://localhost:27019/")
        mydb = client['health-form-scheduler']    
        mycollection = mydb["table"]
        mycollection.insert_one(value_to_insert)
        value_return['status'] = True
    return value_return