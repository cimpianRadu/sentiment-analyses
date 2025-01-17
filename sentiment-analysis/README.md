## Setup

### Install dependencies

```
$ npm i
```

### Environment setup

In order to run the app successfully, you need to create a **.env** file and add these variables:

- REACT_APP_REGION
- REACT_APP_ACCESS_KEY_ID
- REACT_APP_SECRET_ACCESS_KEY

> ⚠️ Create your AWS account or reach out for help

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Run the tests.

### `npm run build`

> ⚠️ Not ready for production, TBH

## Observations

### Code structure

My understanding is that most of the code should be included in **App.tsx**. I took the liberty to create some _types_ file, _aws-config_ and other little helpers. But all the "React" code can be found in App.tsx.

I didn't go crazy for small componenta that can be composed etc. I kept it simple.

I hope I understood correctly 😅

### Code styling

I didn't spend much time on styling so the App has a quite rudimentar UI. Also the CSS can be found in the global file. Nothing fancy here
