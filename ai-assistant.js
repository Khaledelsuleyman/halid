// AI Assistant functionality
class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.responses = {
            ar: {
                greetings: [
                    'مرحباً! كيف يمكنني مساعدتك اليوم؟',
                    'أهلاً وسهلاً! أنا هنا لمساعدتك في اختيار أفضل الأطعمة.',
                    'مرحباً بك في بيتزا ماما! كيف يمكنني خدمتك؟'
                ],
                menu: [
                    'لدينا مجموعة رائعة من البيتزا والباستا والمشروبات. أي نوع تفضل؟',
                    'قائمتنا تشمل بيتزا مارجريتا، بيبروني، الخضار، واللحم. كما لدينا باستا كاربونارا وأرابياتا.',
                    'أنصحك بتجربة بيتزا مارجريتا الشهيرة أو باستا كاربونارا اللذيذة!'
                ],
                pizza: [
                    'بيتزا ممتازة! أنصحك ببيتزا مارجريتا الكلاسيكية أو بيتزا البيبروني الشهية.',
                    'لدينا أربعة أنواع رائعة: مارجريتا (45 ريال)، بيبروني (55 ريال)، الخضار (50 ريال)، واللحم (65 ريال).',
                    'بيتزا اللحم هي الأكثر شعبية، لكن بيتزا الخضار صحية ولذيذة أيضاً!'
                ],
                pasta: [
                    'الباستا لدينا طازجة ولذيذة! أنصحك بباستا كاربونارا الكريمية.',
                    'لدينا نوعان: كاربونارا (40 ريال) وأرابياتا الحارة (35 ريال).',
                    'باستا كاربونارا مع الكريمة والبيكون هي الأكثر طلباً!'
                ],
                drinks: [
                    'لدينا عصير برتقال طازج (15 ريال) وكوكا كولا (8 ريال).',
                    'عصير البرتقال الطازج مثالي مع البيتزا!',
                    'المشروبات الغازية تكمل الوجبة بشكل رائع.'
                ],
                price: [
                    'أسعارنا معقولة جداً! البيتزا من 45-65 ريال، والباستا من 35-40 ريال.',
                    'نقدم أفضل قيمة مقابل المال في المدينة!',
                    'جميع أسعارنا شاملة الضريبة والخدمة.'
                ],
                delivery: [
                    'نوصل خلال 30 دقيقة أو أقل!',
                    'التوصيل مجاني للطلبات أكثر من 50 ريال.',
                    'فريق التوصيل لدينا سريع وموثوق.'
                ],
                hours: [
                    'نعمل يومياً من 11:00 صباحاً حتى 12:00 منتصف الليل.',
                    'مفتوحون 7 أيام في الأسبوع لخدمتكم!',
                    'يمكنك الطلب في أي وقت خلال ساعات العمل.'
                ],
                location: [
                    'نقع في شارع الملك فهد، الرياض.',
                    'عنواننا: شارع الملك فهد، الرياض، المملكة العربية السعودية.',
                    'موقع مميز وسهل الوصول إليه!'
                ],
                order: [
                    'يمكنك الطلب مباشرة من الموقع! اختر ما تريد وأضفه للسلة.',
                    'اضغط على "إضافة للسلة" بجانب أي منتج، ثم اضغط على أيقونة السلة لإتمام الطلب.',
                    'عملية الطلب سهلة وسريعة! اختر، أضف للسلة، واطلب!'
                ],
                thanks: [
                    'شكراً لك! أتمنى أن أكون قد ساعدتك.',
                    'عفواً! أي استفسار آخر؟',
                    'سعيد لمساعدتك! استمتع بوجبتك!'
                ],
                default: [
                    'عذراً، لم أفهم سؤالك. يمكنك السؤال عن القائمة، الأسعار، التوصيل، أو أي شيء آخر.',
                    'هل يمكنك إعادة صياغة سؤالك؟ أنا هنا لمساعدتك!',
                    'أعتذر، لم أستطع فهم طلبك. جرب السؤال بطريقة أخرى.'
                ]
            },
            en: {
                greetings: [
                    'Hello! How can I help you today?',
                    'Welcome! I\'m here to help you choose the best food.',
                    'Welcome to Pizza Mama! How can I serve you?'
                ],
                menu: [
                    'We have a great selection of pizza, pasta, and drinks. What type do you prefer?',
                    'Our menu includes Margherita, Pepperoni, Veggie, and Meat pizzas. We also have Carbonara and Arrabbiata pasta.',
                    'I recommend trying our famous Margherita pizza or delicious Carbonara pasta!'
                ],
                pizza: [
                    'Excellent choice! I recommend the classic Margherita or tasty Pepperoni pizza.',
                    'We have four great types: Margherita (45 SAR), Pepperoni (55 SAR), Veggie (50 SAR), and Meat (65 SAR).',
                    'Meat pizza is most popular, but Veggie pizza is healthy and delicious too!'
                ],
                pasta: [
                    'Our pasta is fresh and delicious! I recommend the creamy Carbonara.',
                    'We have two types: Carbonara (40 SAR) and spicy Arrabbiata (35 SAR).',
                    'Carbonara with cream and bacon is the most ordered!'
                ],
                drinks: [
                    'We have fresh orange juice (15 SAR) and Coca Cola (8 SAR).',
                    'Fresh orange juice is perfect with pizza!',
                    'Soft drinks complement the meal perfectly.'
                ],
                price: [
                    'Our prices are very reasonable! Pizza 45-65 SAR, Pasta 35-40 SAR.',
                    'We offer the best value for money in town!',
                    'All our prices include tax and service.'
                ],
                delivery: [
                    'We deliver within 30 minutes or less!',
                    'Free delivery for orders over 50 SAR.',
                    'Our delivery team is fast and reliable.'
                ],
                hours: [
                    'We\'re open daily from 11:00 AM to 12:00 AM.',
                    'Open 7 days a week to serve you!',
                    'You can order anytime during business hours.'
                ],
                location: [
                    'We\'re located on King Fahd Street, Riyadh.',
                    'Our address: King Fahd Street, Riyadh, Saudi Arabia.',
                    'Prime location and easy to reach!'
                ],
                order: [
                    'You can order directly from the website! Choose what you want and add to cart.',
                    'Click "Add to Cart" next to any product, then click the cart icon to complete your order.',
                    'Ordering is easy and fast! Choose, add to cart, and order!'
                ],
                thanks: [
                    'Thank you! I hope I was helpful.',
                    'You\'re welcome! Any other questions?',
                    'Happy to help! Enjoy your meal!'
                ],
                default: [
                    'Sorry, I didn\'t understand your question. You can ask about menu, prices, delivery, or anything else.',
                    'Could you rephrase your question? I\'m here to help!',
                    'I apologize, I couldn\'t understand your request. Try asking differently.'
                ]
            }
        };
    }

    toggle() {
        const assistant = document.getElementById('ai-assistant');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            assistant.classList.add('active');
            assistant.style.display = 'flex';
        } else {
            assistant.classList.remove('active');
            setTimeout(() => {
                assistant.style.display = 'none';
            }, 300);
        }
    }

    sendMessage(message) {
        if (!message.trim()) return;

        const messagesContainer = document.getElementById('ai-messages');
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        document.getElementById('ai-input').value = '';
        
        // Generate and add bot response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }

    addMessage(message, type) {
        const messagesContainer = document.getElementById('ai-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = message;
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(message) {
        const lang = currentLanguage || 'ar';
        const responses = this.responses[lang];
        const lowerMessage = message.toLowerCase();
        
        // Keywords for different categories
        const keywords = {
            greetings: ['مرحبا', 'أهلا', 'السلام', 'hello', 'hi', 'hey'],
            menu: ['قائمة', 'طعام', 'menu', 'food'],
            pizza: ['بيتزا', 'pizza'],
            pasta: ['باستا', 'pasta'],
            drinks: ['مشروب', 'عصير', 'drink', 'juice'],
            price: ['سعر', 'كم', 'price', 'cost', 'how much'],
            delivery: ['توصيل', 'delivery'],
            hours: ['ساعات', 'وقت', 'متى', 'hours', 'time', 'when'],
            location: ['عنوان', 'موقع', 'أين', 'location', 'address', 'where'],
            order: ['طلب', 'اطلب', 'order'],
            thanks: ['شكرا', 'thanks', 'thank you']
        };
        
        // Find matching category
        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => lowerMessage.includes(word))) {
                const categoryResponses = responses[category];
                return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
            }
        }
        
        // Default response
        const defaultResponses = responses.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

// Initialize AI Assistant
const aiAssistant = new AIAssistant();

// Global functions
function toggleAI() {
    aiAssistant.toggle();
}

function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    if (message) {
        aiAssistant.sendMessage(message);
    }
}

// Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const aiInput = document.getElementById('ai-input');
    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }
});
