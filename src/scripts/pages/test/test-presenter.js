import * as tf from '@tensorflow/tfjs';
import { Model } from '../../../data/model';

class TestPresenter {
  constructor({ view, container }) {
    this._view = view;
    this._container = container;
    this._model = new Model(this);

    // Parameter untuk preprocessing dan model
    this._maxLen = 100;
  }

  async showTestPageContent() {
    this._renderTestForm();
  }


  _renderTestForm() {
    this._container.innerHTML = `
      <section class="test-page" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;">
        <div class="test-form" style="width: 100%; max-width: 700px; background: #1c0c2b; padding: 2rem; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); color: white;">
          <h2 class="text-center mb-4" style="color: #ffd600;">Tes Minat Studi</h2>
          <textarea id="inputText" rows="5" placeholder="Tulis deskripsi minat atau cita-cita Anda..." style="width: 100%; padding: 1rem; border-radius: 10px; border: none; font-size: 1rem;"></textarea>
          <button id="predictBtn" style="margin-top: 1rem; padding: 0.75rem 1.5rem; border: none; background-color: #ffd600; color: #1c0c2b; font-weight: bold; border-radius: 10px; cursor: pointer;">Prediksi Jurusan</button>
          <div id="result" style="margin-top: 1.5rem; font-size: 1.2rem;"></div>
        </div>
      </section>
    `;

    const predictBtn = document.getElementById('predictBtn');
    predictBtn.addEventListener('click', () => this._predict());
  }

  async _predict() {
    const inputText = document.getElementById('inputText').value
    const resultEl = document.getElementById('result');

    if (!inputText) {
      resultEl.innerText = 'Masukkan deskripsi terlebih dahulu.';
      return;
    }

    try{
      const result = await this._model.getPrediction(inputText)
      resultEl.innerText = `Prediksi Jurusan: ${result}`;
    }catch(error){
      resultEl.innerText = 'Terjadi kesalahan saat memproses input.';
    }
    
  }
}

export default TestPresenter;
