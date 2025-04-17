# 🌌 NASA APOD Explorer

Explore the universe one day at a time with **NASA's Astronomy Picture of the Day (APOD)**!  
This project is a sleek, responsive, and interactive web app that fetches images and information from the NASA APOD API. Users can explore daily space pictures, search by keyword, browse by date, and view detailed information.

🔗 **Live Demo:** [https://apodfornasa.netlify.app](https://apodfornasa.netlify.app)  
🔗 **Backend API:** [https://nasa-apod-vglf.onrender.com](https://nasa-apod-vglf.onrender.com)

---

## 🚀 Features

- 🖼️ Display NASA's APOD with title, explanation, date, and media type (image/video).
- 🔍 **Search Functionality**:
  - Search by **keyword** (e.g., galaxy, nebula, moon).
  - Search by **specific date** (e.g., 2024-01-01).
  - Filter by a **date range**.
- 🔄 Random daily results from NASA's endpoint (`count: 30`).
- 📱 Fully responsive design using Tailwind CSS.
- 🔗 Dedicated **More Info** page with HD images and YouTube embeds (if any).
- 🌐 API proxy via custom Express backend to enhance keyword search and handle CORS.

---

## 🧰 Tech Stack

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Datepicker](https://reactdatepicker.com/)
- [Netlify](https://www.netlify.com/) for deployment

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [Render](https://render.com/) for deployment
