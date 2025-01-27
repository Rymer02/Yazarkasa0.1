const products = [];
const cart = [];
const veresiye = [];

function addProduct() {
  const barcode = document.getElementById('barcode').value;
  const price = parseFloat(document.getElementById('price').value);
  if (!barcode || !price) {
    alert('Barkod ve fiyat giriniz.');
    return;
  }
  products.push({ barcode, price });
  document.getElementById('barcode').value = '';
  document.getElementById('price').value = '';
  alert('Ürün eklendi.');
}

function scanBarcode() {
  const barcode = document.getElementById('scanBarcode').value;
  const product = products.find(p => p.barcode === barcode);
  if (product) {
    cart.push(product);
    document.getElementById('scanBarcode').value = '';
    updateCartTable();
  } else {
    alert('Ürün bulunamadı.');
  }
}

function updateCartTable() {
  const cartTableBody = document.querySelector('#cartTable tbody');
  cartTableBody.innerHTML = '';
  cart.forEach(item => {
    const row = `<tr><td>${item.barcode}</td><td>${item.price.toFixed(2)} TL</td></tr>`;
    cartTableBody.innerHTML += row;
  });
}

function completeSale() {
  const customer = document.getElementById('customer').value;
  if (!customer) {
    alert('Müşteri adı giriniz.');
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  veresiye.push({ customer, total });
  cart.length = 0;
  updateCartTable();
  updateVeresiyeTable();
  document.getElementById('customer').value = '';
  alert('Veresiye kaydedildi.');
}

function updateVeresiyeTable() {
  const veresiyeTableBody = document.querySelector('#veresiyeTable tbody');
  veresiyeTableBody.innerHTML = '';
  veresiye.forEach(entry => {
    const row = `<tr><td>${entry.customer}</td><td>${entry.total.toFixed(2)} TL</td></tr>`;
    veresiyeTableBody.innerHTML += row;
  });
}
