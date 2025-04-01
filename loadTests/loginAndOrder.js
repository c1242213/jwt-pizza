import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response
  const vars = {}

  group('page_1 - https://pizza.carlee329.click/', function () {
    // Login
    response = http.put(
      'https://pizza-service.carlee329.click/api/auth',
      '{"email":"d@jwt.com","password":"diner"}',
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/json',
          origin: 'https://pizza.carlee329.click',
        },
      }
    )
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Login was *not* 200');
    }
    vars['token'] = jsonpath.query(response.json(), '$.token')[0]
    sleep(7.5)

    // Get Menu
    response = http.get('https://pizza-service.carlee329.click/api/order/menu', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${vars['token']}`,
        'content-type': 'application/json',
        origin: 'https://pizza.carlee329.click',
      },
    })
    sleep(0.5)

    // Purchase pizza
    response = http.post(
      'https://pizza-service.carlee329.click/api/order',
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          authorization: `Bearer ${vars['token']}`,
          'content-type': 'application/json',
          origin: 'https://pizza.carlee329.click',
        },
      }
    )
    if (!check(response, { 'status equals 201': response => response.status.toString() === '201' })) {
      console.log(response.body);
      fail('Order was *not* 201');
    }
    // Capture the JWT from the purchase response
    vars['pizzaJwt'] = jsonpath.query(response.json(), '$.jwt')[0]
    sleep(2.7)

    // Verify Pizza using the captured JWT
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      JSON.stringify({ jwt: vars['pizzaJwt'] }),
      {
        headers: {
          accept: '*/*',
          authorization: `Bearer ${vars['token']}`,
          'content-type': 'application/json',
          origin: 'https://pizza.carlee329.click',
        },
      }
    )
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Verification was *not* 200');
    }
  })
}