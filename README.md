# Shortly URL Shortener – Frontend Mentor Challenge

A responsive React landing page that lets users shorten URLs using the [Clean URI API](https://cleanuri.com/docs), view a stack of their shortened links, and copy them with one click.

![Design preview for the Shortly URL shortening API coding challenge](./img/desktop-preview.jpg)

## Features

- **Responsive Design:** Optimized for mobile and desktop layouts.
- **URL Shortening:** Enter any valid URL to get a shortened link via CleanURI.
- **Stacked Results:** See a list of all your shortened links below the input, styled as in the design.
- **Copy to Clipboard:** Copy any shortened link with a single click and get instant feedback.
- **Persistent Links:** Your shortened links are saved in local storage and remain after refreshing the browser.
- **Error Handling:** Get clear error messages for empty input or API errors.

## How It Works

1. Enter a URL in the input field and click "Shorten it!".
2. The app sends your URL to a Node.js/Express backend, which proxies the request to CleanURI.
3. The shortened link appears in a stacked list below the input, along with the original URL and a "Copy" button.
4. Click "Copy" to copy the shortened URL to your clipboard. The button will show "Copied!" for feedback.
5. All your shortened links are saved and will reappear if you reload the page.

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express, Axios (for CleanURI API proxy)
- **Clipboard:** Uses the browser's Clipboard API

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/et-mohan/URL-shortening-API-landing-page.git
cd url-shortening-api
```

### 2. Install dependencies

```bash
# For the backend
cd API
npm install

# For the frontend
cd ../url-shortening-api
npm install
```

### 3. Start the backend

```bash
cd ../API
node server.js
```

### 4. Start the frontend

```bash
cd ../url-shortening-api
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000).

## Notes

- **CORS:** The backend acts as a proxy to avoid CORS issues with CleanURI.
- **Local Storage:** Shortened links are saved in your browser’s local storage.
- **API Errors:** If the CleanURI API is down or returns an error, you’ll see a helpful message.

## Screenshots

![Shorten and stack results](./design/desktop-preview.jpg)

## Credits

Challenge by [Frontend Mentor](https://www.frontendmentor.io).  
Coded by [Your Name].

---

**Have fun building! 🚀**
