import React, { Component } from 'react';
import Titles from './components/title/Titles';
import Form from './components/form/Form';
import './App.css'
import Weather from './components/weather/Weather';

console.log('process.env', process.env.NODE_ENV);
const API_KEY = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_KEY : null;

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    try {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await api_call.json();
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } catch(err) {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the values correctly'
      })
    }
  }
  render() {
    const { temperature, city, country, humidity, description, error } = this.state;
    return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="containerxl">
              <div className="row">
                <div className="col-12 col-sm-5 col-md-5 col-xl-5 title-container">
                <Titles />
                </div>
                <div className="col-12 col-sm-7 col-md-7 col-xl-7  form-container">
                <Form getWeather={this.getWeather}/>
                <Weather 
                  temperature={temperature}
                  city={city}
                  country={country}
                  humidity={humidity}
                  description={description}
                  error={error}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;