import time
from email_validator import validate_email


def check_name(value):	
	return len(value) > 1

def check_email(value):
	try:
		email = value.lower()
		validate_email(email)
		return True
	except:
		pass
	return False

def check_time_milliseconds(value):
	current_time_in_milliseconds = int(time.time() * 1000)
	return value > current_time_in_milliseconds

model_to_compare = {
    'name': str,
    'email': str,
    'time_milliseconds': int
}

list_function_model_to_compare = {
    'name': check_name,
    'email': check_email,
    'time_milliseconds': check_time_milliseconds
}

def checker_value_to_insert(value_to_filter):
	everything_ok = True
	for key in model_to_compare:

		if key in value_to_filter:
			item_test = value_to_filter[key]
			item_model_to_compare = model_to_compare[key]

			if isinstance(item_test, item_model_to_compare):		
				item_checked = list_function_model_to_compare[key](item_test)
				if item_checked == True:
						continue
				
		everything_ok = False

	return everything_ok

