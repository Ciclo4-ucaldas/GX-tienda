import environment
from twilio.rest import Client
from flask import Flask
from flask import request
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import mail


app=Flask(__name__)

@app.route("/")
def inicio():
    print("entro")
    test=os.environ["prueba"]
    return test

@app.route("/sms")
def sms():
    try:
        account_sid=os.environ["TWILIO_ACCOUNT_SID"]
        auth_token=os.environ["TWILIO_AUTH_TOKEN"]
        client=Client(account_sid,auth_token)
        contenido = request.args.get('message')
        destino = request.args.get('phone')
        message=client.messages.create(
            body=contenido,
            from_='+18655036552',
            to='+57'+destino
            )
        print(message.sid)
        return "enviado correctamente"
    except Exception as e:
        print(e)
        return "ocurrio un error"


if __name__=='__main__':
    app.run()

