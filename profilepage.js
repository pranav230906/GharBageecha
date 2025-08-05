// Patient data object
        let patientData = {
            name: "Roger Curtis",
            age: 36,
            gender: "Male",
            bloodType: "O+ (Positive)",
            allergies: "Milk, Penicillin",
            diseases: "Diabetes, Blood Disorders",
            height: "1.78m",
            weight: "65 kg",
            patientId: "208898796",
            lastVisit: "25th October 2019",
            vitals: {
                heartRate: 80,
                temperature: 36.5,
                glucose: 100
            }
        };

        
        // Profile image upload functionality
        function uploadProfileImage() {
            document.getElementById('avatarInput').click();
        }

        function handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const avatarElement = document.getElementById('patientAvatar');
                    avatarElement.innerHTML = `
                        <img src="${e.target.result}" alt="Patient Avatar">
                        <div class="avatar-upload"></div>
                        <input type="file" id="avatarInput" class="avatar-input" accept="image/*" onchange="handleImageUpload(event)">
                    `;
                    showNotification("Profile image updated successfully!");
                };
                reader.readAsDataURL(file);
            }
        }

        // Enhanced update modal
        function showUpdateModal() {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h2 class="modal-title">Update Patient Information</h2>
                    <div class="form-group">
                        <label class="form-label">Patient Name</label>
                        <input type="text" class="form-input" id="modalName" value="${patientData.name}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Age</label>
                        <input type="number" class="form-input" id="modalAge" value="${patientData.age}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Gender</label>
                        <select class="form-input" id="modalGender">
                            <option value="Male" ${patientData.gender === 'Male' ? 'selected' : ''}>Male</option>
                            <option value="Female" ${patientData.gender === 'Female' ? 'selected' : ''}>Female</option>
                            <option value="Other" ${patientData.gender === 'Other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Blood Type</label>
                        <select class="form-input" id="modalBloodType">
                            <option value="O+ (Positive)" ${patientData.bloodType === 'O+ (Positive)' ? 'selected' : ''}>O+ (Positive)</option>
                            <option value="O- (Negative)" ${patientData.bloodType === 'O- (Negative)' ? 'selected' : ''}>O- (Negative)</option>
                            <option value="A+ (Positive)" ${patientData.bloodType === 'A+ (Positive)' ? 'selected' : ''}>A+ (Positive)</option>
                            <option value="A- (Negative)" ${patientData.bloodType === 'A- (Negative)' ? 'selected' : ''}>A- (Negative)</option>
                            <option value="B+ (Positive)" ${patientData.bloodType === 'B+ (Positive)' ? 'selected' : ''}>B+ (Positive)</option>
                            <option value="B- (Negative)" ${patientData.bloodType === 'B- (Negative)' ? 'selected' : ''}>B- (Negative)</option>
                            <option value="AB+ (Positive)" ${patientData.bloodType === 'AB+ (Positive)' ? 'selected' : ''}>AB+ (Positive)</option>
                            <option value="AB- (Negative)" ${patientData.bloodType === 'AB- (Negative)' ? 'selected' : ''}>AB- (Negative)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Height (m)</label>
                        <input type="text" class="form-input" id="modalHeight" value="${patientData.height}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Weight (kg)</label>
                        <input type="text" class="form-input" id="modalWeight" value="${patientData.weight}">
                    </div>
                    <div class="modal-buttons">
                        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
                        <button class="btn-primary" onclick="updatePatientInfo()">Update</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal on background click
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        function closeModal() {
            const modal = document.querySelector('.modal');
            if (modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        }

        function updatePatientInfo() {
            const name = document.getElementById('modalName').value;
            const age = document.getElementById('modalAge').value;
            const gender = document.getElementById('modalGender').value;
            const bloodType = document.getElementById('modalBloodType').value;
            const height = document.getElementById('modalHeight').value;
            const weight = document.getElementById('modalWeight').value;
            
            if (name && age) {
                patientData.name = name;
                patientData.age = parseInt(age);
                patientData.gender = gender;
                patientData.bloodType = bloodType;
                patientData.height = height;
                patientData.weight = weight;
                
                // Update UI
                document.getElementById('patientName').textContent = name;
                document.getElementById('patientAge').textContent = age;
                document.getElementById('gender').textContent = gender;
                document.getElementById('bloodType').textContent = bloodType;
                document.getElementById('height').textContent = height;
                document.getElementById('weight').textContent = weight;
                
                // Update avatar initials if no image
                const avatarElement = document.getElementById('patientAvatar');
                if (!avatarElement.querySelector('img')) {
                    const initials = name.split(' ').map(n => n[0]).join('');
                    avatarElement.childNodes[0].textContent = initials;
                }
                
                closeModal();
                showNotification("Patient information updated successfully!");
            } else {
                alert("Please fill in all required fields (Name and Age)");
            }
        }

        // Patient update function (legacy - replaced by modal)
        function updatePatient() {
            showUpdateModal();
        }

        // Vital signs interaction
        function showVitalDetails(vitalType) {
            let message = "";
            switch(vitalType) {
                case 'heart-rate':
                    message = `Heart Rate: ${patientData.vitals.heartRate} bpm\nStatus: Normal range (60-100 bpm)`;
                    break;
                case 'temperature':
                    message = `Body Temperature: ${patientData.vitals.temperature}°C\nStatus: Normal (36.1-37.2°C)`;
                    break;
                case 'glucose':
                    message = `Glucose Level: ${patientData.vitals.glucose} mg/dl\nStatus: Normal fasting glucose (70-100 mg/dl)`;
                    break;
            }
            alert(message);
        }

        // Test report functions
        function openTestReport(testType) {
            let message = "";
            switch(testType) {
                case 'ct-scan':
                    message = "Opening CT Scan - Full Body report from 12th February 2020";
                    break;
                case 'creatine':
                    message = "Opening Creatine Kinase T report from 19th February 2020";
                    break;
                case 'eye-test':
                    message = "Opening Eye Fluorescein Test report from 12th February 2020";
                    break;
            }
            alert(message);
        }

        // Prescription functions
        function addPrescription() {
            const prescription = prompt("Enter prescription name:");
            const date = prompt("Enter prescription date (e.g., 25th October 2019):");
            const duration = prompt("Enter duration (e.g., 3 months):");
            
            if (prescription && date && duration) {
                // Create new prescription row
                const prescriptionTable = document.querySelector('.prescription-table');
                const newRow = document.createElement('div');
                newRow.className = 'prescription-row';
                newRow.innerHTML = `
                    <div class="prescription-name">
                        <div class="prescription-icon"></div>
                        <span class="prescription-text">${prescription}</span>
                    </div>
                    <div class="prescription-date">${date}</div>
                    <div class="prescription-duration">${duration}</div>
                `;
                prescriptionTable.appendChild(newRow);
                showNotification("Prescription added successfully!");
            }
        }

        // Notification system
        function showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #00b894, #00a085);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            
            // Add animation keyframes
            if (!document.querySelector('#notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
                style.textContent = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOut {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                    .modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 2000;
                        animation: fadeIn 0.3s ease;
                    }
                    .modal-content {
                        background: white;
                        padding: 30px;
                        border-radius: 15px;
                        width: 400px;
                        max-width: 90%;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        animation: slideUp 0.3s ease;
                    }
                    .modal-title {
                        font-size: 20px;
                        font-weight: 700;
                        color: #0d2c6c;
                        margin-bottom: 20px;
                    }
                    .form-group {
                        margin-bottom: 20px;
                    }
                    .form-label {
                        display: block;
                        margin-bottom: 5px;
                        color: #64748b;
                        font-weight: 500;
                    }
                    .form-input {
                        width: 100%;
                        padding: 10px;
                        border: 2px solid #e2e8f0;
                        border-radius: 8px;
                        font-size: 14px;
                        transition: border-color 0.3s ease;
                    }
                    .form-input:focus {
                        outline: none;
                        border-color: #00b894;
                    }
                    .modal-buttons {
                        display: flex;
                        gap: 10px;
                        justify-content: flex-end;
                    }
                    .btn-primary {
                        background: linear-gradient(135deg, #00b894, #00a085);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    .btn-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 25px rgba(0, 184, 148, 0.3);
                    }
                    .btn-secondary {
                        background: #e2e8f0;
                        color: #64748b;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    .btn-secondary:hover {
                        background: #cbd5e1;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { transform: translateY(50px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Real-time vital signs simulation
        function simulateVitalSigns() {
            setInterval(() => {
                // Simulate small fluctuations in vital signs
                const heartRateVariation = Math.floor(Math.random() * 6) - 3; // ±3
                const tempVariation = (Math.random() * 0.4) - 0.2; // ±0.2
                const glucoseVariation = Math.floor(Math.random() * 10) - 5; // ±5
                
                patientData.vitals.heartRate = Math.max(70, Math.min(90, 80 + heartRateVariation));
                patientData.vitals.temperature = Math.max(36.0, Math.min(37.0, 36.5 + tempVariation));
                patientData.vitals.glucose = Math.max(90, Math.min(110, 100 + glucoseVariation));
                
                // Update display
                document.getElementById('heartRate').innerHTML = `${patientData.vitals.heartRate}<span class="vital-unit">bpm</span>`;
                document.getElementById('temperature').innerHTML = `${patientData.vitals.temperature.toFixed(1)}<span class="vital-unit">°C</span>`;
                document.getElementById('glucose').innerHTML = `${patientData.vitals.glucose}<span class="vital-unit">mg/dl</span>`;
                
            }, 5000); // Update every 5 seconds
        }

        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                const pages = ['Dashboard', 'Patients', 'Appointments', 'Medical Records', 'Reports', 'Settings'];
                if (index < pages.length) {
                    showNotification(`Navigating to ${pages[index]}...`);
                }
            });
        });

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            showNotification("Welcome to Healthcare Dashboard!");
            simulateVitalSigns();
        });

        // Responsive interactions
        document.querySelectorAll('.vital-card, .test-item').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });


        function LogoutPage() 
        {
            window.location.href = 'home.html';
        }