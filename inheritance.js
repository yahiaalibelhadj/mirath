// ===========================================
// حساب الميراث - Version JavaScript
// ===========================================

function calculateInheritance() {
    // Récupération des données
    const amount = parseFloat(document.getElementById('المبلغ').value) || 0;
    const debt = parseFloat(document.getElementById('ديون').value) || 0;
    const amountAfterDebt = amount - debt;
    
    const sons = parseInt(document.getElementById('أبناء').value) || 0;
    const daughters = parseInt(document.getElementById('بنات').value) || 0;
    const father = parseInt(document.getElementById('أب').value) || 0;
    const mother = parseInt(document.getElementById('أم').value) || 0;
    
    const gender = document.getElementById('جنس_المتوفى').value;
    let husband = 0, wives = 0;
    
    if (gender === 'أنثى') {
        husband = parseInt(document.getElementById('زوج').value) || 0;
    } else {
        wives = parseInt(document.getElementById('زوجات').value) || 0;
    }
    
    const grandsons = parseInt(document.getElementById('ابناء_الابناء').value) || 0;
    const granddaughters = parseInt(document.getElementById('بنات_البنات').value) || 0;
    
    const deathTimeGrandson = document.getElementById('وفاة_ابناء_الابناء')?.value || 'بعد';
    const deathTimeGranddaughter = document.getElementById('وفاة_بنات_البنات')?.value || 'بعد';
    
    // Calcul
    let shares = {};
    let remaining = amountAfterDebt;
    let fatherShareFromGrandfather = 0;
    
    // الزوج
    if (husband === 1) {
        if (sons + daughters + grandsons > 0) {
            shares["الزوج"] = amountAfterDebt * 0.25;
        } else {
            shares["الزوج"] = amountAfterDebt * 0.5;
        }
        remaining -= shares["الزوج"];
    }
    
    // الزوجات
    if (wives > 0) {
        let totalShare;
        if (sons + daughters + grandsons > 0) {
            totalShare = amountAfterDebt * 0.125;
        } else {
            totalShare = amountAfterDebt * 0.25;
        }
        const sharePerWife = totalShare / wives;
        for (let i = 1; i <= wives; i++) {
            shares[`الزوجة ${i}`] = sharePerWife;
        }
        shares["الزوجات (مجموع)"] = totalShare;
        remaining -= totalShare;
    }
    
    // الأم
    if (mother === 1) {
        let share;
        if (sons + daughters + grandsons > 0) {
            share = amountAfterDebt * (1/6);
        } else {
            share = amountAfterDebt * (1/3);
        }
        shares["الأم"] = share;
        remaining -= share;
    }
    
    // الأب
    if (father === 1 && sons > 0) {
        shares["الأب"] = amountAfterDebt * (1/6);
        remaining -= shares["الأب"];
    }
    
    // التعصيب للأبناء والبنات
    if (remaining > 0.001 && sons + daughters > 0) {
        const totalParts = (sons * 2) + daughters;
        const valuePerPart = remaining / totalParts;
        
        for (let i = 1; i <= sons; i++) {
            shares[`الابن ${i}`] = valuePerPart * 2;
        }
        for (let i = 1; i <= daughters; i++) {
            shares[`البنت ${i}`] = valuePerPart;
        }
        
        fatherShareFromGrandfather = valuePerPart * 2;
    }
    
    // Préparation des données pour les graphiques
    const labels = [];
    const data = [];
    let totalDistributed = 0;
    
    for (const [key, value] of Object.entries(shares)) {
        if (key !== "الزوجات (مجموع)" && value > 0) {
            labels.push(key);
            data.push(value);
            totalDistributed += value;
        }
    }
    
    // Affichage des résultats
    displayResults({
        amountAfterDebt,
        shares,
        labels,
        data,
        totalDistributed,
        grandsons,
        deathTimeGrandson,
        fatherShareFromGrandfather,
        sons,
        daughters,
        husband,
        wives,
        mother,
        father,
        amount
    });
}

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    const formContainer = document.getElementById('formContainer');
    
    let html = `
        <h2>📊 نتيجة توزيع ميراث الجد</h2>
    `;
    
    // Avertissement pour أبناء الأبناء
    if (results.grandsons > 0 && results.deathTimeGrandson === "بعد") {
        html += `
            <div class="warning">
                <strong style="font-size: 18px;">⚠️ تنبيه هام جداً:</strong>
                <p style="font-size: 16px; margin-top: 10px;">
                    <strong>أبناء الأبناء (عدد: ${results.grandsons})</strong> لا يرثون من الجد مباشرة،<br>
                    لأن أباهم (الابن) توفي <strong>بعد</strong> الجد.
                </p>
                <p style="font-size: 15px; margin-top: 10px;">
                    ✅ الابن كان حياً وقت وفاة الجد وورث منه <strong>${results.fatherShareFromGrandfather.toFixed(2)} دج</strong>.<br>
                    ✅ بعد وفاة الابن، سيرث أبناؤه (أبناء الأبناء) من <strong>تركته هو</strong> (التي تشمل هذا المبلغ).
                </p>
            </div>
        `;
    }
    
    // Graphique
    if (results.labels.length > 0) {
        html += `
            <div class="chart-container">
                <div class="chart-box">
                    <div class="chart-title">📈 توزيع ميراث الجد</div>
                    <canvas id="grandfatherChart"></canvas>
                </div>
            </div>
        `;
    }
    
    // Tableau
    html += `<table>`;
    html += `<tr><th>الوارث من الجد</th><th>النصيب (دج)</th><th>النسبة</th><th>ملاحظات</th></tr>`;
    
    for (const [heir, value] of Object.entries(results.shares)) {
        if (heir !== "الزوجات (مجموع)" && value > 0) {
            const percentage = (value / results.amountAfterDebt) * 100;
            let note = "";
            if (heir.includes("الابن")) note = "يرث بالتعصيب مع البنات";
            else if (heir.includes("البنت")) note = "ترث مع الذكور بالتعصيب";
            else if (heir.includes("الزوجة")) note = "نصيبها من الثمن/الربع";
            else note = "نصيب شرعي حسب الفرض";
            
            html += `
                <tr>
                    <td>${heir}</td>
                    <td><strong>${value.toFixed(2)}</strong></td>
                    <td>${percentage.toFixed(2)}%</td>
                    <td>${note}</td>
                </tr>
            `;
        }
    }
    
    html += `
        <tr class="total-row">
            <td colspan="2"><strong>مجموع ميراث الجد</strong></td>
            <td colspan="2"><strong>${results.totalDistributed.toFixed(2)} دج</strong></td>
        </tr>
    `;
    html += `</table>`;
    
    // Section ميراث الابن
    if (results.grandsons > 0 && results.deathTimeGrandson === "بعد") {
        const fatherTotal = results.fatherShareFromGrandfather + 300000;
        const wifeShare = fatherTotal * 0.125;
        const remainingFather = fatherTotal - wifeShare;
        const eachSonShare = remainingFather / results.grandsons;
        
        html += `
            <h2>📋 ميراث الابن (أبو الأبناء) - بعد وفاته</h2>
            <div class="note">
                <p><strong>💰 نصيب الابن من الجد:</strong> ${results.fatherShareFromGrandfather.toFixed(2)} دج</p>
                <p><strong>➕ أمواله الخاصة (افتراضياً):</strong> 300,000 دج</p>
                <p><strong>📦 إجمالي تركة الابن:</strong> ${fatherTotal.toFixed(2)} دج</p>
            </div>
            
            <div class="chart-container">
                <div class="chart-box">
                    <div class="chart-title">📈 توزيع ميراث الابن (أبو الأبناء)</div>
                    <canvas id="fatherChart"></canvas>
                </div>
            </div>
            
            <table>
                <tr><th>الوارث من الابن</th><th>النصيب (دج)</th><th>النسبة</th><th>التفاصيل</th></tr>
        `;
        
        for (let i = 1; i <= results.grandsons; i++) {
            html += `
                <tr>
                    <td>ابن الابن ${i}</td>
                    <td><strong>${eachSonShare.toFixed(2)} دج</strong></td>
                    <td>${((eachSonShare / fatherTotal) * 100).toFixed(2)}%</td>
                    <td>نصيبه من ميراث أبيه (بعد نصيب الزوجة)</td>
                </tr>
            `;
        }
        
        html += `
                <tr>
                    <td>زوجة الابن (أمهم)</td>
                    <td><strong>${wifeShare.toFixed(2)} دج</strong></td>
                    <td>${((wifeShare / fatherTotal) * 100).toFixed(2)}%</td>
                    <td>الزوجة ترث الثمن (1/8) لوجود الأبناء</td>
                </tr>
                <tr class="total-row">
                    <td colspan="2"><strong>مجموع ميراث الابن</strong></td>
                    <td colspan="2"><strong>${fatherTotal.toFixed(2)} دج</strong></td>
                </tr>
            </table>
            
            <div class="note">
                <strong>📌 ملاحظة مهمة:</strong>
                <ul style="margin-top: 10px;">
                    <li>هذا التوزيع افتراضي بناءً على أن ورثة الابن هم: <strong>زوجته + أبناؤه الخمسة</strong> فقط.</li>
                    <li>إذا كان للابن <strong>والدان أحياء</strong> أو <strong>بنات</strong>، يتغير التوزيع.</li>
                </ul>
            </div>
        `;
    }
    
    if (results.grandsons > 0 && results.deathTimeGrandson === "قبل") {
        html += `
            <div class="note">
                <strong>📌 الوصية الواجبة:</strong>
                <p>أبناء الأبناء (<strong>${results.grandsons}</strong>) يرثون من الجد مباشرة <strong>بالوصية الواجبة</strong> لأن أباهم توفي قبل الجد.</p>
            </div>
        `;
    }
    
    html += `
        <div style="text-align: center; margin-top: 40px;">
            <button onclick="showForm()" class="btn-back">🔙 العودة للإدخال</button>
        </div>
        
        <div style="margin-top: 30px; font-size: 14px; color: #666; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
            <p>⚠️ هذا البرنامج يقدم حسابات استرشادية حسب القانون الجزائري. للفتوى الشرعية الدقيقة، راجع عالم فقه موثوق.</p>
        </div>
    `;
    
    container.innerHTML = html;
    container.style.display = 'block';
    formContainer.style.display = 'none';
    
    // Création des graphiques
    if (results.labels.length > 0) {
        new Chart(document.getElementById('grandfatherChart'), {
            type: 'pie',
            data: {
                labels: results.labels,
                datasets: [{
                    data: results.data,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#87CEEB', '#FFB6C1', '#98FB98', '#DDA0DD'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(2);
                                return context.label + ': ' + value.toFixed(2) + ' دج (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Graphique pour le père si nécessaire
    if (results.grandsons > 0 && results.deathTimeGrandson === "بعد") {
        const fatherTotal = results.fatherShareFromGrandfather + 300000;
        const wifeShare = fatherTotal * 0.125;
        const remainingFather = fatherTotal - wifeShare;
        const eachSonShare = remainingFather / results.grandsons;
        
        const fatherLabels = [];
        const fatherData = [];
        
        for (let i = 1; i <= results.grandsons; i++) {
            fatherLabels.push(`ابن الابن ${i}`);
            fatherData.push(eachSonShare);
        }
        fatherLabels.push("زوجة الابن");
        fatherData.push(wifeShare);
        
        new Chart(document.getElementById('fatherChart'), {
            type: 'pie',
            data: {
                labels: fatherLabels,
                datasets: [{
                    data: fatherData,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#87CEEB', '#98FB98'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(2);
                                return context.label + ': ' + value.toFixed(2) + ' دج (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
}

function showForm() {
    document.getElementById('resultsContainer').style.display = 'none';
    document.getElementById('formContainer').style.display = 'block';
    window.scrollTo(0, 0);
}