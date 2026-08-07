import { applyTokens } from '@quevy/tokens';
import '../qv-button/index.js';

applyTokens();

document
    .getElementById('test-form')
    ?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! (qv-button type="submit" jalan)');
    });

document
    .getElementById('pick-card')
    ?.addEventListener('click', () => {
        alert('Card diklik - bukan navigasi, cuma custom aciton');
    })