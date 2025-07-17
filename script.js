// Menu Data
const menuItems = [
    {
        id: 1,
        name: "بيتزا مارجريتا",
        description: "صلصة طماطم، جبنة موزاريلا، ريحان طازج",
        price: 45,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "بيتزا بيبروني",
        description: "صلصة طماطم، جبنة موزاريلا، بيبروني",
        price: 55,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "بيتزا الخضار",
        description: "صلصة طماطم، جبنة، فلفل ملون، زيتون، فطر",
        price: 50,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "بيتزا اللحم",
        description: "صلصة طماطم، جبنة، لحم مفروم، بصل",
        price: 65,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "باستا كاربونارا",
        description: "باستا بالكريمة والبيكون والجبن",
        price: 40,
        category: "pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "باستا أرابياتا",
        description: "باستا بصلصة الطماطم الحارة",
        price: 35,
        category: "pasta",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "عصير برتقال طازج",
        description: "عصير برتقال طبيعي 100%",
        price: 15,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "كوكا كولا",
        description: "مشروب غازي منعش",
        price: 8,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayMenuItems(menuItems);
    setupEventListeners();
    updateCartUI();
});

// Display menu items
function displayMenuItems(items) {
    menuGrid.innerHTML = '';
    items.forEach(item => {
        const menuItemHTML = `
            <div class="menu-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">${item.price} ريال</span>
                        <button class="add-to-cart" onclick="addToCart(${item.id})">
                            إضافة للسلة
                        </button>
                    </div>
                </div>
            </div>
        `;
        menuGrid.innerHTML += menuItemHTML;
    });
}

// Filter menu items by category
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter menu
            filterMenu(this.dataset.category);
        });
    });

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Modal close functionality
    document.querySelector('.close').addEventListener('click', closeCart);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCart();
        }
    });

    // Contact form
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.');
        this.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    
    updateCartUI();
    showAddToCartAnimation();
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    displayCartItems();
}

// Update item quantity in cart
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
            displayCartItems();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
    
    // Show/hide cart button based on items
    const cartButton = document.querySelector('.cart-button');
    if (totalItems > 0) {
        cartButton.style.display = 'flex';
    } else {
        cartButton.style.display = 'none';
    }
}

// Display cart items in modal
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #7f8c8d;">السلة فارغة</p>';
        return;
    }
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price} ريال × ${item.quantity}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="updateQuantity(${item.id}, -1)" style="background: #e74c3c; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" style="background: #27ae60; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">+</button>
                    <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-right: 10px;">حذف</button>
                </div>
            </div>
        `;
        cartItems.innerHTML += cartItemHTML;
    });
}

// Open cart modal
function openCart() {
    displayCartItems();
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCart() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderSummary = cart.map(item => `${item.name} × ${item.quantity}`).join('\n');
    
    alert(`تم تأكيد طلبك!\n\nتفاصيل الطلب:\n${orderSummary}\n\nالمجموع: ${total} ريال\n\nسيتم التواصل معك لتأكيد التوصيل.`);
    
    // Clear cart
    cart = [];
    updateCartUI();
    closeCart();
}

// Scroll to menu function
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add to cart animation
function showAddToCartAnimation() {
    // Simple animation feedback
    const cartButton = document.querySelector('.cart-button');
    cartButton.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartButton.style.transform = 'scale(1)';
    }, 200);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.menu-item, .feature, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
