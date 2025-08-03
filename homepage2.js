
        // Import Firebase libraries from CDN
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // Global variables provided by the Canvas environment
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        
        let app, db, auth, userId;

        // Create particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Scroll reveal animation
        function handleScrollReveal() {
            const reveals = document.querySelectorAll('.scroll-reveal');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.1 });
            
            reveals.forEach(reveal => {
                observer.observe(reveal);
            });
        }

        // Update progress bar
        function updateProgress(step) {
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            const width = (step / 3) * 100;
            
            progressBar.style.width = width + '%';
            progressText.textContent = `Step ${step} of 3`;
        }

        // Initialize and authenticate Firebase
        async function initializeFirebase() {
            try {
                if (Object.keys(firebaseConfig).length > 0) {
                    app = initializeApp(firebaseConfig);
                    db = getFirestore(app);
                    auth = getAuth(app);
                    
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                    } else {
                        await signInAnonymously(auth);
                    }
                } else {
                    console.error("Firebase config is not available. Community features will be disabled.");
                    document.getElementById('auth-status').innerHTML = `
                        <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                        Community features are disabled due to missing configuration.
                    `;
                }
            } catch (error) {
                console.error("Error initializing Firebase:", error);
                document.getElementById('auth-status').innerHTML = `
                    <i class="fas fa-times-circle text-red-500 mr-2"></i>
                    Error initializing community features.
                `;
            }
            
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    userId = user.uid;
                    document.getElementById('auth-status').innerHTML = `
                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                        Authenticated. Your User ID: ${userId}
                    `;
                    if (db) {
                        setupCommunityListener();
                    }
                } else {
                    document.getElementById('auth-status').innerHTML = `
                        <i class="fas fa-user-slash text-gray-500 mr-2"></i>
                        Not authenticated.
                    `;
                }
            });
        }

        // This function will fetch and display messages in real-time
        function setupCommunityListener() {
            const messagesRef = collection(db, `artifacts/${appId}/public/data/community_messages`);
            const messagesQuery = query(messagesRef);
            
            onSnapshot(messagesQuery, (snapshot) => {
                const messagesContainer = document.getElementById('community-messages');
                messagesContainer.innerHTML = '';
                
                if (snapshot.empty) {
                    messagesContainer.innerHTML = `
                        <div class="text-center text-gray-600 py-8">
                            <i class="fas fa-comments text-4xl mb-4 opacity-50"></i>
                            <p>No messages yet. Be the first to post!</p>
                        </div>
                    `;
                    return;
                }
                
                snapshot.forEach(doc => {
                    const messageData = doc.data();
                    const messageElement = document.createElement('div');
                    messageElement.className = 'glass p-4 rounded-2xl shadow-sm hover-lift animate-fadeInUp';
                    messageElement.innerHTML = `
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                ${messageData.userId.charAt(0).toUpperCase()}
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-gray-900 leading-relaxed">${messageData.text}</p>
                                <p class="text-xs text-gray-600 mt-2 flex items-center">
                                    <i class="fas fa-user text-green-500 mr-1"></i>
                                    <span class="font-semibold">${messageData.userId}</span>
                                    <i class="fas fa-clock text-gray-400 ml-3 mr-1"></i>
                                    ${messageData.timestamp ? new Date(messageData.timestamp.seconds * 1000).toLocaleString() : 'Just now'}
                                </p>
                            </div>
                        </div>
                    `;
                    messagesContainer.appendChild(messageElement);
                });
                
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, (error) => {
                console.error("Error fetching messages:", error);
                document.getElementById('community-messages').innerHTML = `
                    <div class="text-center text-red-500 py-8">
                        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                        <p>Error loading messages.</p>
                    </div>
                `;
            });
        }

        // Add a new message to the community board
        async function sendMessage(e) {
            e.preventDefault();
            const messageInput = document.getElementById('message-input');
            const messageText = messageInput.value.trim();
            
            if (!messageText || !db || !userId) {
                console.error("Cannot send message. Database not ready or no text entered.");
                return;
            }
            
            try {
                const messagesRef = collection(db, `artifacts/${appId}/public/data/community_messages`);
                await addDoc(messagesRef, {
                    text: messageText,
                    userId: userId,
                    timestamp: serverTimestamp()
                });
                messageInput.value = '';
                
                // Add visual feedback
                const button = e.target.querySelector('button[type="submit"]');
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.classList.add('bg-green-600');
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('bg-green-600');
                }, 1000);
                
            } catch (error) {
                console.error("Error adding message to Firestore:", error);
            }
        }

        // Function to handle AI chat
        async function askGeminiAI(e) {
            e.preventDefault();
            const questionInput = document.getElementById('ai-question-input');
            const questionText = questionInput.value.trim();
            const aiChatContainer = document.getElementById('ai-chat-container');
            
            if (!questionText) {
                return;
            }
            
            // Append user message to the chat
            const userMessageElement = document.createElement('div');
            userMessageElement.className = 'text-sm glass p-4 rounded-2xl shadow-sm self-end max-w-xs md:max-w-md ml-auto animate-fadeInUp';
            userMessageElement.innerHTML = `
                <div class="flex items-start space-x-2">
                    <div class="flex-1">
                        <p class="font-bold text-gray-900 flex items-center">
                            <i class="fas fa-user text-blue-500 mr-2"></i>You
                        </p>
                        <p class="text-gray-600 mt-2">${questionText}</p>
                    </div>
                </div>
            `;
            aiChatContainer.appendChild(userMessageElement);
            
            // Add a loading message for the AI response
            const loadingElement = document.createElement('div');
            loadingElement.id = 'ai-loading';
            loadingElement.className = 'text-sm glass p-4 rounded-2xl shadow-sm self-start max-w-xs md:max-w-md animate-pulse';
            loadingElement.innerHTML = `
                <div class="flex items-start space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center text-white">
                        <i class="fas fa-robot text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <p class="font-bold text-gray-900">AI Assistant</p>
                        <p class="text-gray-600 mt-2">
                            <span class="loading-dots">Thinking</span>
                        </p>
                    </div>
                </div>
            `;
            aiChatContainer.appendChild(loadingElement);
            aiChatContainer.scrollTop = aiChatContainer.scrollHeight;
            questionInput.value = '';
            
            const prompt = `You are an expert on rooftop gardening. A user has asked you the following question: "${questionText}". Please provide a concise, helpful, and friendly response.`;
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            
            const payload = {
                contents: chatHistory
            };
            
            // Placeholder for API key - replace with actual key
            const apiKey = "YOUR_GEMINI_API_KEY_HERE";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) {
                    throw new Error(`API call failed with status: ${response.status}`);
                }
                
                const result = await response.json();
                
                // Remove loading message
                aiChatContainer.removeChild(loadingElement);
                
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    
                    const aiResponseText = result.candidates[0].content.parts[0].text;
                    
                    const aiMessageElement = document.createElement('div');
                    aiMessageElement.className = 'text-sm glass p-4 rounded-2xl shadow-sm self-start max-w-xs md:max-w-md animate-fadeInUp';
                    aiMessageElement.innerHTML = `
                        <div class="flex items-start space-x-2">
                            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center text-white">
                                <i class="fas fa-robot text-sm"></i>
                            </div>
                            <div class="flex-1">
                                <p class="font-bold text-gray-900">AI Assistant</p>
                                <p class="text-gray-600 mt-2 leading-relaxed">${aiResponseText}</p>
                            </div>
                        </div>
                    `;
                    aiChatContainer.appendChild(aiMessageElement);
                } else {
                    const errorElement = document.createElement('div');
                    errorElement.className = 'text-sm glass p-4 rounded-2xl shadow-sm self-start max-w-xs md:max-w-md';
                    errorElement.innerHTML = `
                        <div class="flex items-start space-x-2">
                            <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                                <i class="fas fa-exclamation-triangle text-sm"></i>
                            </div>
                            <div class="flex-1">
                                <p class="font-bold text-red-800">AI Assistant</p>
                                <p class="text-red-600 mt-2">Error: No valid response from API.</p>
                            </div>
                        </div>
                    `;
                    aiChatContainer.appendChild(errorElement);
                }
            } catch (error) {
                console.error("Error asking AI:", error);
                
                const currentLoadingElement = document.getElementById('ai-loading');
                if (currentLoadingElement) {
                    currentLoadingElement.remove();
                }
                
                const errorElement = document.createElement('div');
                errorElement.className = 'text-sm glass p-4 rounded-2xl shadow-sm self-start max-w-xs md:max-w-md';
                errorElement.innerHTML = `
                    <div class="flex items-start space-x-2">
                        <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                            <i class="fas fa-exclamation-triangle text-sm"></i>
                        </div>
                        <div class="flex-1">
                            <p class="font-bold text-red-800">AI Assistant</p>
                            <p class="text-red-600 mt-2">Failed to get a response. Please try again later. Error: ${error.message}</p>
                        </div>
                    </div>
                `;
                aiChatContainer.appendChild(errorElement);
            } finally {
                aiChatContainer.scrollTop = aiChatContainer.scrollHeight;
            }
        }

        // Function to generate a comprehensive plan using the Gemini API
        async function generatePlanWithGemini() {
            const resultsDiv = document.getElementById('planner-results');
            resultsDiv.classList.remove('hidden');
            
            // Add loading animations
            document.getElementById('method-recommendation').innerHTML = '<div class="loading-dots">Generating plan</div>';
            document.getElementById('crop-suggestions').innerHTML = '<div class="loading-dots">Generating</div>';
            document.getElementById('roi-estimate').innerHTML = '<div class="loading-dots">Generating</div>';
            document.getElementById('impact-estimate').innerHTML = '<div class="loading-dots">Generating</div>';
            document.getElementById('layout-plan').innerHTML = '<div class="loading-dots">Generating</div>';
            document.getElementById('vendor-suggestions').innerHTML = '<div class="loading-dots">Generating</div>';
            
            resultsDiv.scrollIntoView({ behavior: 'smooth' });

            const width = parseFloat(document.getElementById('rooftop-width').value);
            const length = parseFloat(document.getElementById('rooftop-length').value);
            const sunlight = parseFloat(document.getElementById('sunlight-hours').value);
            const loadCapacity = parseFloat(document.getElementById('load-capacity').value);
            const currentUsage = document.getElementById('current-usage').value;
            const city = document.getElementById('city').value;
            const country = document.getElementById('country').value;

            // Simple validation
            if (isNaN(width) || isNaN(length) || isNaN(sunlight) || isNaN(loadCapacity) || !city || !country) {
                document.getElementById('planner-results').innerHTML = `
                    <div class="glass p-6 rounded-2xl bg-red-100 text-red-800 shadow-sm">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        Please fill out all the required fields.
                    </div>
                `;
                return;
            }

            const prompt = `
                I am planning a rooftop garden with the following specifications:
                - Rooftop Area: ${width * length} m² (${width}m x ${length}m)
                - Daily Sunlight: ${sunlight} hours
                - Load Capacity: ${loadCapacity} kg/m²
                - Current Usage: ${currentUsage}
                - Location: City ${city}, Country ${country}

                Please act as a rooftop farming expert and generate a short and concise plan in JSON format. For each item, provide a summary of the plan using bullet points. The plan should be well-structured and include the following keys:
                - "methodRecommendation": a list of bullet points recommending and explaining the best farming method.
                - "cropSuggestions": a list of bullet points with suggested crops.
                - "roiEstimate": a list of bullet points with estimated ROI and savings.
                - "impactEstimate": a list of bullet points with estimated environmental impact.
                - "layoutPlan": a list of bullet points describing a potential layout plan.
                - "vendorSuggestions": a list of bullet points with suggestions for vendors and tools.
            `;

            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });

            const payload = {
                contents: chatHistory,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "OBJECT",
                        properties: {
                            "methodRecommendation": { "type": "ARRAY", "items": { "type": "STRING" } },
                            "cropSuggestions": { "type": "ARRAY", "items": { "type": "STRING" } },
                            "roiEstimate": { "type": "ARRAY", "items": { "type": "STRING" } },
                            "impactEstimate": { "type": "ARRAY", "items": { "type": "STRING" } },
                            "layoutPlan": { "type": "ARRAY", "items": { "type": "STRING" } },
                            "vendorSuggestions": { "type": "ARRAY", "items": { "type": "STRING" } }
                        },
                        "propertyOrdering": ["methodRecommendation", "cropSuggestions", "roiEstimate", "impactEstimate", "layoutPlan", "vendorSuggestions"]
                    }
                }
            };

            // Placeholder for API key - replace with actual key
            const apiKey = "AIzaSyAHdagt6KCEEfQlV6iaeEjkx4et6ha0gdo";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API call failed with status: ${response.status}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {

                    const jsonString = result.candidates[0].content.parts[0].text;
                    const plan = JSON.parse(jsonString);

                    // Animate the results appearing
                    setTimeout(() => {
                        document.getElementById('method-recommendation').innerHTML = plan.methodRecommendation.map(p => `<li class="mb-2 flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i><span>${p}</span></li>`).join('');
                    }, 500);
                    
                    setTimeout(() => {
                        document.getElementById('crop-suggestions').innerHTML = plan.cropSuggestions.map(p => `<li class="mb-2 flex items-start"><i class="fas fa-seedling text-green-500 mr-2 mt-1"></i><span>${p}</span></li>`).join('');
                    }, 1000);
                    
                    setTimeout(() => {
                        document.getElementById('roi-estimate').innerHTML = plan.roiEstimate.map(p => `<li class="mb-2 flex items-start"><i class="fas fa-dollar-sign text-green-500 mr-2 mt-1"></i><span>${p}</span></li>`).join('');
                    }, 1500);
                    
                    setTimeout(() => {
                        document.getElementById('impact-estimate').innerHTML = plan.impactEstimate.map(p => `<li class="mb-2 flex items-start"><i class="fas fa-leaf text-green-500 mr-2 mt-1"></i><span>${p}</span></li>`).join('');
                    }, 2000);
                    
                    setTimeout(() => {
                        document.getElementById('layout-plan').innerHTML = plan.layoutPlan.map(p => `<li class="mb-2 flex items-start"><i class="fas fa-map text-green-500 mr-2 mt-1"></i><span>${p}</span></li>`).join('');
                    }, 2500);
                    
                    setTimeout(() => {
                        document.getElementById('vendor-suggestions').innerHTML = plan.vendorSuggestions.map(p => `<li class="mb-2 flex items-start"><i class="fas fa-store text-green-500 mr-2 mt-1"></i><span>${p}</span></li>`).join('');
                    }, 3000);

                } else {
                    document.getElementById('method-recommendation').innerHTML = `
                        <div class="text-red-600 flex items-center">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            Error: No valid response from API.
                        </div>
                    `;
                }
            } catch (error) {
                console.error("Error generating plan:", error);
                document.getElementById('method-recommendation').innerHTML = `
                    <div class="text-red-600 flex items-center">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        Failed to generate plan. Please try again later. Error: ${error.message}
                    </div>
                `;
            }
        }

        // Function to navigate between pages
        function showPage(pageId) {
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.add('hidden');
                page.style.opacity = '0';
            });
            
            const targetPage = document.getElementById(pageId);
            targetPage.classList.remove('hidden');
            
            // Animate page transition
            setTimeout(() => {
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'translateY(0)';
            }, 50);
            
            if (pageId === 'community') {
                if (!db) {
                    initializeFirebase();
                }
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Function to navigate between form steps
        function nextStep(currentStep) {
            const currentStepElement = document.getElementById(`step-${currentStep}`);
            const nextStepElement = document.getElementById(`step-${currentStep + 1}`);
            
            // Animate out current step
            currentStepElement.style.transform = 'translateX(-100%)';
            currentStepElement.style.opacity = '0';
            
            setTimeout(() => {
                currentStepElement.classList.add('hidden');
                nextStepElement.classList.remove('hidden');
                
                // Animate in next step
                nextStepElement.style.transform = 'translateX(100%)';
                nextStepElement.style.opacity = '0';
                
                setTimeout(() => {
                    nextStepElement.style.transform = 'translateX(0)';
                    nextStepElement.style.opacity = '1';
                }, 50);
            }, 300);
            
            updateProgress(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function prevStep(currentStep) {
            const currentStepElement = document.getElementById(`step-${currentStep}`);
            const prevStepElement = document.getElementById(`step-${currentStep - 1}`);
            
            // Animate out current step
            currentStepElement.style.transform = 'translateX(100%)';
            currentStepElement.style.opacity = '0';
            
            setTimeout(() => {
                currentStepElement.classList.add('hidden');
                prevStepElement.classList.remove('hidden');
                
                // Animate in previous step
                prevStepElement.style.transform = 'translateX(-100%)';
                prevStepElement.style.opacity = '0';
                
                setTimeout(() => {
                    prevStepElement.style.transform = 'translateX(0)';
                    prevStepElement.style.opacity = '1';
                }, 50);
            }, 300);
            
            updateProgress(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Add event listeners for navigation and buttons
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize animations and effects
            createParticles();
            handleScrollReveal();
            
            // Navigation event listeners
            document.getElementById('nav-home')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                showPage('home'); 
            });
            document.getElementById('nav-home-2')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                showPage('home'); 
            });
            document.getElementById('nav-planner')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                showPage('planner'); 
            });
            document.getElementById('nav-community')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                showPage('community'); 
            });
            document.getElementById('nav-resources')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                showPage('resources'); 
            });
            
            // Button event listeners
            document.getElementById('start-planner-btn')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                showPage('planner'); 
            });
            
            // Form navigation
            document.getElementById('next-step-1')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                nextStep(1); 
            });
            document.getElementById('prev-step-2')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                prevStep(2); 
            });
            document.getElementById('next-step-2')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                nextStep(2); 
            });
            document.getElementById('prev-step-3')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                prevStep(3); 
            });
            document.getElementById('generate-gemini-plan-btn')?.addEventListener('click', (e) => { 
                e.preventDefault(); 
                generatePlanWithGemini(); 
            });
            
            // Chat functionality
            document.getElementById('message-form')?.addEventListener('submit', sendMessage);
            document.getElementById('ai-form')?.addEventListener('submit', askGeminiAI);
            
            // Add navbar scroll effect
            window.addEventListener('scroll', () => {
                const navbar = document.getElementById('navbar');
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                    navbar.style.backdropFilter = 'blur(10px)';
                }
            });
            
            // Initialize progress
            updateProgress(1);
            
            // Initially show the home page
            showPage('home');
        });