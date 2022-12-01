#run this file to test the deep learning models that predict the weather in the metaverse
import numpy as np
import tensorflow as tf
import yfinance as yf
import uvicorn
from fastapi import FastAPI



app = FastAPI()
def fun_predict(list_inputs, path ):
  '''
  Function is used to change the input to suit the input shape of the model.
  '''
  y_test_1 = np.array([list_inputs], dtype='float64')
  y_test_1 = tf.constant(y_test_1)
  y_test_1= tf.expand_dims(y_test_1, axis = -1)
  saved_standard_model = tf.keras.models.load_model(path)
  output = saved_standard_model.predict(y_test_1)
  return output[0]

def get_current_price(symbol):
    '''
    gets the current price of the currency.
    '''
    ticker = yf.Ticker(symbol)
    todays_data = ticker.history(period='1d')
    list_out = [round(todays_data['Open'][0],3), round(todays_data['High'][0],3), round(todays_data['Low'][0],3), round(todays_data['Close'][0],3)]
    return list_out
    
def per_clac(a, p):
  fin = ((p-a)/a)
  return fin

# [cloudy(Low Risk):1 , plesant(Good):2 , rainy(Risky):3 , thunderstrom(High Risk):4]
def climate_model(currency):
  y_today = get_current_price(currency)
  path = f'model_{currency}.h5'
  y_future= fun_predict(y_today, path)
  h_a, l_a, c_a = y_today[1], y_today[2], y_today[3]
  h_p, l_p, c_p = y_future[1], y_future[2], y_future[3]
  h_per = (per_clac(h_a, h_p))
  l_per = (per_clac(l_a, l_p))
  c_per = (per_clac(c_a, c_p))
  if h_per> 0.00 and h_per<= 0.09 and c_per>0.0 and c_per<=0.09:
    final_val = 1
  elif h_per> 0.09 and c_per>0.09 :
    final_val = 2
  elif -l_per>= 0.0 and -l_per<= 0.09 and -c_per>0.0 and -c_per<=0.09:
    final_val = 3
  elif -l_per> 0.09 and -c_per> 0.09:
    final_val = 4
  else:
    final_val = 3

  return final_val
  
@tf.function
@app.get("/")  
def get_four_climate():
    j= 0
    climatex =[0,0,0,0]
    curr = ["AAVE-USD","ADM-USD","QUICK-USD","SUSHI-USD"]
    for i in curr:
        climatex[j] = climate_model(i)
        j+=1

    return{"AAVE": climatex[0],"ADM": climatex[1],"QUICK": climatex[2],"SUSHI": climatex[3]}

if __name__ == '__main__':
      uvicorn.run(app)



