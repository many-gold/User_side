<template>
  <footer class="footer col-md-12">
    <div class="footer-container ">
      <!-- Contact Us Section -->
      <div class="footer-section">
        <h3>Contact Us</h3>
        <ul>
          <li>Contact Center Toll Free: <strong>921</strong></li>
          <li>Phone: +251 11 470 6158</li>
          <li>Phone: +251 11 470 6854</li>
          <li>Fax: +251 11 470 6152</li>
          <li>P.O. Box: 2506 Code 1000</li>
          <li>Email: <a href="mailto:info@tsehaybank.com.et">info@tsehaybank.com.et</a></li>
          <li>Head Office: Sierra Leone Av, Kirkos Sub-city, Woreda 04, Meaza Dessalegn Bldg, Addis Ababa, Ethiopia</li>
        </ul>
      </div>

      <!-- Quick Links Section -->
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/InformationPortal/importantLinks">Important Links</router-link></li>
          <li><router-link to="/InformationPortal/PhoneDirectory">Departments Phone No</router-link></li>
          <li><router-link to="/InformationPortal/InternalVacancy">Vacancy</router-link></li>
          <li><a href="https://tsehaybank.com.et/branches/" target="_blank">Branch and ATM</a></li>
          <li><a href="https://tsehaybank.com.et/exchange-rate/" target="_blank">Daily Exchange Rate</a></li>
          <li><a href="https://tsehaybank.com.et/loan-calculator/" target="_blank">Loan Calculator</a></li>
          <li>SWIFT Code: <strong>TSCPETAA</strong></li>
        </ul>
      </div>

      <!-- Follow Us Section -->
      <div class="footer-section">
        <h3>Follow Us</h3>
        <ul>
          <li>
            <a href="https://t.me/tsehaybanksc" target="_blank"><font-awesome-icon :icon="['fab', 'telegram']" /> Telegram</a>
          </li>
          <li>
            <a href="https://web.facebook.com/tsehaybanksc" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']" /> Facebook</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/tsehaybank/" target="_blank"><font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn</a>
          </li>
          <li>
            <a href="https://www.instagram.com/tsehay_bank/" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']" /> Instagram</a>
          </li>
          <li>
            <a href="https://x.com/tsehaybank" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" /> Twitter</a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCqj_qre7CVg_8vBtn2zTNQA" target="_blank"><font-awesome-icon :icon="['fab', 'youtube']" /> YouTube</a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@tsehaybank" target="_blank"><font-awesome-icon :icon="['fab', 'tiktok']" /> TikTok</a>
          </li>
          <li>
            <a href="https://www.pinterest.com/tsehaybank/" target="_blank"><font-awesome-icon :icon="['fab', 'pinterest']" /> Pinterest</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom text-center">
      <strong>© 2024 Tsehay Bank. All Rights Reserved.</strong>
    </div>
  </footer>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: "Footer",
};
</script>

<style scoped>
h3 {
  color: #ffc907;
}

.footer {
  background-color: #efeded;
  color: #34663e;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
}

.footer-section h3 {
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
}

.footer-section ul {
  list-style-type: none;
  padding-left: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section a {
  text-decoration: none;
  color: #34663e;
  font-size: 14px;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  width: 100%;
  padding-top: 10px;
  border-top: 1px solid #ccc;
}
</style>
