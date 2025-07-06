
        // CTF Challenge: The secret PIN is stored in this variable
        const secretPin = '1337'; // The PIN to find
        
        // PIN functionality
        document.querySelector('.pin-btn').addEventListener('click', function() {
            const digits = document.querySelectorAll('.pin-digit');
            let pin = '';
            
            digits.forEach(digit => {
                pin += digit.value;
            });
            
            if(pin === secretPin) {
                document.getElementById('protected-content').style.display = 'block';
                document.querySelector('.pin-section').style.display = 'none';
            } else {
                document.getElementById('pin-error').style.display = 'block';
                // Clear inputs
                digits.forEach(digit => {
                    digit.value = '';
                });
                // Focus first digit
                digits[0].focus();
                
                // Shake animation for error
                this.parentElement.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    this.parentElement.style.animation = '';
                }, 500);
            }
        });
        
        // Move to next input when digit is entered
        document.querySelectorAll('.pin-digit').forEach((digit, index, digits) => {
            digit.addEventListener('input', function() {
                if(this.value.length === 1 && index < digits.length - 1) {
                    digits[index+1].focus();
                }
            });
            
            digit.addEventListener('keydown', function(e) {
                if(e.key === 'Backspace' && this.value === '' && index > 0) {
                    digits[index-1].focus();
                }
            });
        });
        
        // Comment submission with XSS vulnerability
        document.querySelectorAll('.comment-submit').forEach(button => {
            button.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const commentText = input.value.trim();
                
                if(commentText) {
                    const commentsList = this.closest('.comments-section').querySelector('.comments-list');
                    
                    // Create new comment - vulnerable to XSS
                    const newComment = document.createElement('div');
                    newComment.className = 'comment';
                    newComment.innerHTML = `
                        <img src="https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 70)}" class="comment-pic">
                        <div class="comment-content">
                            <div class="comment-user">Anonymous</div>
                            <div class="comment-text">${commentText}</div>
                        </div>
                    `;
                    
                    commentsList.prepend(newComment);
                    input.value = '';
                }
            });
        });
        
        // Allow Enter key in comment inputs
        document.querySelectorAll('.comment-input').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if(e.key === 'Enter') {
                    this.nextElementSibling.click();
                }
            });
        });
        
        // Like button functionality
        document.querySelectorAll('.action-btn').forEach(button => {
            if(button.innerHTML.includes('fa-heart')) {
                button.addEventListener('click', function() {
                    if(this.classList.contains('liked')) {
                        this.classList.remove('liked');
                        this.innerHTML = '<i class="fas fa-heart"></i> Like';
                    } else {
                        this.classList.add('liked');
                        this.innerHTML = '<i class="fas fa-heart" style="color:#f00;"></i> Liked';
                    }
                });
            }
        });
        
        // Matrix-like falling characters effect
        document.addEventListener('DOMContentLoaded', function() {
            const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$#@%&*";
            const canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.zIndex = '-1';
            canvas.style.pointerEvents = 'none';
            
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const columns = Math.floor(canvas.width / 20);
            const drops = [];
            
            for(let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
            
            function draw() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = '#0f0';
                ctx.font = '16px monospace';
                
                for(let i = 0; i < drops.length; i++) {
                    const text = chars.charAt(Math.floor(Math.random() * chars.length));
                    ctx.fillText(text, i * 20, drops[i] * 20);
                    
                    if(drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            }
            
            setInterval(draw, 33);
        });
   