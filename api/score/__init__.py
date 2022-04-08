import logging
import requests
import json
import os
import azure.functions as func


def getScore(data, endpoint_url, endpoint_key):

    payload = json.dumps(data)
    headers = {
    'Authorization': f'Bearer {endpoint_key}',
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", endpoint_url, headers=headers, data=payload)
    
    # print(response.text)
    # only the first score (from array) is returned
    return json.dumps(response.json()[0])



def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    req_body = req.get_json()
    url = os.environ["AZUREML_ENDPOINT_URL"]
    key = os.environ["AZUREML_ENDPOINT_KEY"]

    resp = getScore(data = req_body, endpoint_url = url, endpoint_key = key)

    # response = {
    #         "authToken": token,
    #         "region": region
    #     }
    # ret = json.dumps(response, sort_keys=True, indent=4, separators=(',', ': '))

    return func.HttpResponse(
            resp,
            status_code=200
    )



