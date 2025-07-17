// Admin Panel JavaScript
const ADMIN_PASSWORD = 'halid123';

// Sample data
let orders = [
    {
        id: '001',
        customer: 'أحمد محمد',
        items: 'بيتزا مارجريتا × 2',
        total: 90,
        status: 'delivered',
        time: 'منذ 5 دقائق'
    },
    {
        id: '002',
        customer: 'فاطمة علي',
        items: 'باستا كاربونارا',
        total: 40,
        status: 'preparing',
        time: 'منذ 15 دقيقة'
    },
    {
        id: '003',
        customer: 'محمد سالم',
        items: 'بيتزا بيبروني، عصير برتقال',
        total: 70,
        status: 'pending',
        time: 'منذ 2 دقيقة'
    },
    {
        id: '004',
        customer: 'سارة أحمد',
        items: 'باستا أرابياتا، كوكا كولا',
        total: 43,
        status: 'preparing',
        time: 'منذ 8 دقائق'
    },
    {
        id: '005',
        customer: 'علي محمود',
        items: 'بيتزا الخضار، عصير مانجو',
        total: 68,
        status: 'delivered',
        time: 'منذ 20 دقيقة'
    }
];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }
    
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            showSection(section);
            
            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add product form
    document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterOrders(this.dataset.filter);
        });
    });
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
    } else {
        errorMessage.textContent = 'كلمة المرور غير صحيحة';
        document.getElementById('password').value = '';
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'grid';
    
    // Load initial data
    loadDashboardData();
    loadProducts();
    loadOrders();
}

// Logout
function logout() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('password').value = '';
    document.getElementById('error-message').textContent = '';
}

// Show section
function showSection(sectionName) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName + '-section').classList.add('active');
}

// Load dashboard data
function loadDashboardData() {
    // Calculate stats
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalProducts = menuItems.length;
    const totalCustomers = new Set(orders.map(order => order.customer)).size;
    
    // Update stats
    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('total-revenue').textContent = totalRevenue.toLocaleString();
    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('total-customers').textContent = totalCustomers;
}

// Load products
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    menuItems.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-card-content">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <div class="product-card-footer">
                        <span class="product-price">${product.price} ريال</span>
                        <div class="product-actions">
                            <button class="edit-btn" onclick="editProduct(${product.id})">
                                <i class="fas fa-edit"></i> تعديل
                            </button>
                            <button class="delete-btn" onclick="deleteProduct(${product.id})">
                                <i class="fas fa-trash"></i> حذف
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

// Load orders
function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        const statusText = getStatusText(order.status);
        const orderCard = `
            <div class="order-card" data-status="${order.status}">
                <div class="order-header">
                    <span class="order-id">#${order.id}</span>
                    <span class="order-time">${order.time}</span>
                </div>
                <div class="order-details">
                    <div class="order-customer">${order.customer}</div>
                    <div class="order-items">${order.items}</div>
                    <div class="order-total">${order.total} ريال</div>
                </div>
                <div class="order-actions">
                    <span class="status ${order.status}">${statusText}</span>
                    <button class="status-btn ${order.status}" onclick="updateOrderStatus('${order.id}')">
                        تحديث الحالة
                    </button>
                </div>
            </div>
        `;
        ordersList.innerHTML += orderCard;
    });
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'pending': 'جديد',
        'preparing': 'قيد التحضير',
        'delivered': 'تم التوصيل'
    };
    return statusMap[status] || status;
}

// Filter orders
function filterOrders(filter) {
    const orderCards = document.querySelectorAll('.order-card');
    orderCards.forEach(card => {
        if (filter === 'all' || card.dataset.status === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Update order status
function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const statusOrder = ['pending', 'preparing', 'delivered'];
        const currentIndex = statusOrder.indexOf(order.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        order.status = statusOrder[nextIndex];
        
        loadOrders();
        loadDashboardData();
    }
}

// Show add product modal
function showAddProductModal() {
    document.getElementById('add-product-modal').style.display = 'block';
}

// Close add product modal
function closeAddProductModal() {
    document.getElementById('add-product-modal').style.display = 'none';
    document.getElementById('add-product-form').reset();
}

// Handle add product
function handleAddProduct(e) {
    e.preventDefault();
    
    const newProduct = {
        id: menuItems.length + 1,
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseInt(document.getElementById('product-price').value),
        category: document.getElementById('product-category').value,
        image: document.getElementById('product-image').value
    };
    
    menuItems.push(newProduct);
    loadProducts();
    loadDashboardData();
    closeAddProductModal();
    
    alert('تم إضافة المنتج بنجاح!');
}

// Edit product
function editProduct(productId) {
    const product = menuItems.find(p => p.id === productId);
    if (product) {
        // Fill form with product data
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-image').value = product.image;
        
        showAddProductModal();
        
        // Change form behavior to edit mode
        const form = document.getElementById('add-product-form');
        form.onsubmit = function(e) {
            e.preventDefault();
            
            // Update product
            product.name = document.getElementById('product-name').value;
            product.description = document.getElementById('product-description').value;
            product.price = parseInt(document.getElementById('product-price').value);
            product.category = document.getElementById('product-category').value;
            product.image = document.getElementById('product-image').value;
            
            loadProducts();
            closeAddProductModal();
            
            // Reset form behavior
            form.onsubmit = handleAddProduct;
            
            alert('تم تحديث المنتج بنجاح!');
        };
    }
}

// Delete product
function deleteProduct(productId) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        const index = menuItems.findIndex(p => p.id === productId);
        if (index > -1) {
            menuItems.splice(index, 1);
            loadProducts();
            loadDashboardData();
            alert('تم حذف المنتج بنجاح!');
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('add-product-modal');
    if (event.target === modal) {
        closeAddProductModal();
    }
}
