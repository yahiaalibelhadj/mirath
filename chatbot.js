// ===========================================
// Chatbot du système d'héritage - Version JavaScript
// ===========================================

const inheritanceChatbot = {
    heirsRules: {
        "زوجة": {
            shares: {
                with_children: "1/8 (الثمن)",
                without_children: "1/4 (الربع)"
            },
            condition: "بشرط صحة الزواج"
        },
        "زوج": {
            shares: {
                with_children: "1/4 (الربع)",
                without_children: "1/2 (النصف)"
            }
        },
        "ام": {
            shares: {
                with_children: "1/6 (السدس)",
                without_children: "1/3 (الثلث)"
            }
        },
        "اب": {
            shares: {
                with_son: "1/6 (السدس) + تعصيب",
                without_son: "العصبة"
            }
        },
        "بنت": {
            shares: {
                one: "1/2 (النصف)",
                two_or_more: "2/3 (الثلثان)",
                with_son: "عصبة"
            }
        },
        "ابن": {
            shares: {
                default: "العصبة (الباقي بعد أصحاب الفروض)"
            }
        }
    },
    
    knowledgeBase: {
        "الميراث_في_الإسلام": {
            keywords: ["الميراث في الإسلام", "المواريث", "علم الفرائض"],
            answer: "📚 **الميراث في الإسلام**\n\n" +
                    "هو ما يتركه الشخص لورثته من أموال وحقوق.\n\n" +
                    "**أركان الميراث:**\n" +
                    "• المُوَرِّث: الشخص المتوفى\n" +
                    "• الوارث: الشخص الحي المستحق للإرث\n" +
                    "• الموروث: المال المتروك\n\n" +
                    "**شروط الإرث:**\n" +
                    "1️⃣ موت المورث\n" +
                    "2️⃣ حياة الوارث بعد موت المورث\n" +
                    "3️⃣ العلم بسبب الإرث (القرابة أو الزوجية)\n\n" +
                    "**موانع الإرث:**\n" +
                    "• اختلاف الدين • القتل • الرق"
        },
        "آية_النساء_11": {
            keywords: ["آية 11", "النساء 11", "آية المواريث الكبرى"],
            answer: "📖 **﴿ يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ ﴾ [النساء: 11]**\n\n" +
                    "**تفصيل الأحكام:**\n" +
                    "• للذكر مثل حظ الأنثيين\n" +
                    "• البنات: الواحدة النصف، والاثنتان فصاعداً الثلثان\n" +
                    "• الأبوين: لكل واحد السدس مع وجود الولد\n" +
                    "• الأم: الثلث مع عدم الولد، السدس مع وجود الإخوة"
        },
        "آية_النساء_12": {
            keywords: ["آية 12", "النساء 12", "آية المواريث الصغرى"],
            answer: "📖 **﴿ وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ... ﴾ [النساء: 12]**\n\n" +
                    "**تفصيل الأحكام:**\n" +
                    "• الزوج: النصف بدون ولد، الربع مع الولد\n" +
                    "• الزوجة: الربع بدون ولد، الثمن مع الولد\n" +
                    "• الإخوة لأم: الواحد السدس، والاثنان فصاعداً الثلث"
        },
        "آية_176": {
            keywords: ["آية 176", "آية الكلالة", "النساء 176"],
            answer: "📖 **﴿ يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ... ﴾ [النساء: 176]**\n\n" +
                    "**تفصيل الأحكام:**\n" +
                    "• الكلالة: من مات وليس له ولد ولا والد\n" +
                    "• الأخت الشقيقة: الواحدة النصف، والاثنتان الثلثان\n" +
                    "• الإخوة الأشقاء: للذكر مثل حظ الأنثيين"
        },
        "القانون_الجزائري": {
            keywords: ["قانون جزائري", "القانون الجزائري", "قانون الأسرة"],
            answer: "📜 **قانون الأسرة الجزائري - الميراث**\n\n" +
                    "**المادة 126:** أسباب الإرث هي القرابة والزوجية.\n" +
                    "**المادة 127:** يستحق الإرث بموت المورث حقيقة أو بحكم القاضي.\n" +
                    "**المادة 128:** شروط الاستحقاق: الحياة وقت الوفاة، إثبات سبب الإرث، عدم وجود مانع.\n" +
                    "**المادة 133:** الوصية الواجبة للأحفاد إذا توفي أصلهم قبل الجد.\n" +
                    "**المادة 135:** موانع الإرث: القتل العمد، شهادة الزور."
        },
        "العول": {
            keywords: ["العول", "عول"],
            answer: "📊 **العول في الميراث**\n\n" +
                    "هو زيادة في سهام أصحاب الفروض ونقص في أنصبائهم بسبب ضيق التركة.\n\n" +
                    "**مثال:** زوج وأختين شقيقتين\n" +
                    "• الزوج: 1/2 = 3/6\n" +
                    "• الأختان: 2/3 = 4/6\n" +
                    "• المجموع: 7/6 (عول)\n" +
                    "• التصحيح: تعول المسألة إلى 7"
        },
        "الحجب": {
            keywords: ["الحجب", "حجب"],
            answer: "📊 **الحجب في الميراث**\n\n" +
                    "هو منع شخص من الإرث كله أو بعضه بسبب وجود شخص آخر.\n\n" +
                    "**أنواعه:**\n" +
                    "• حجب حرمان: يمنع الوارث من الإرث تماماً\n" +
                    "• حجب نقصان: ينقص نصيب الوارث\n\n" +
                    "**مثال:** الأب يحجب الإخوة"
        }
    },
    
    getHeirName: function(heir) {
        const names = {
            "زوجة": "الزوجة", "زوج": "الزوج", "ام": "الأم", "اب": "الأب",
            "بنت": "البنت", "ابن": "الابن", "اخت": "الأخت", "اخ": "الأخ"
        };
        return names[heir] || heir;
    },
    
    formatHeirInfo: function(heir) {
        if (!this.heirsRules[heir]) return "";
        const info = this.heirsRules[heir];
        let text = `📊 نصيب ${this.getHeirName(heir)}:\n\n`;
        
        for (const [key, share] of Object.entries(info.shares)) {
            let condition = key.replace('_', ' ');
            if (key === 'with_children') condition = 'مع وجود ولد';
            else if (key === 'without_children') condition = 'بدون ولد';
            else if (key === 'with_son') condition = 'مع وجود ابن';
            else if (key === 'without_son') condition = 'بدون ابن';
            else if (key === 'one') condition = 'واحدة فقط';
            else if (key === 'two_or_more') condition = 'اثنتان فأكثر';
            else if (key === 'default') condition = 'الحالة العامة';
            
            text += `• ${condition}: ${share}\n`;
        }
        
        if (info.condition) text += `\n⚠️ ${info.condition}`;
        return text;
    },
    
    extractHeirs: function(text) {
        const heirs = [];
        const patterns = {
            "زوجة": /(زوجة|زوجتي)/u,
            "زوج": /(زوج\s|الزوج\s|الزوج$)/u,
            "ام": /(أم|ام\s|الأم)/u,
            "اب": /(أب|اب\s|الأب)/u,
            "ابن": /(ابن|الابن|ابناء)/u,
            "بنت": /(بنت|البنت|ابنة)/u
        };
        
        for (const [heir, pattern] of Object.entries(patterns)) {
            if (pattern.test(text)) heirs.push(heir);
        }
        return [...new Set(heirs)];
    },
    
    calculateInheritance: function(heirs) {
        if (heirs.length < 2) return null;
        
        let result = "📊 تحليل المسألة الوراثية:\n\n";
        result += `الورثة: ${heirs.map(h => this.getHeirName(h)).join('، ')}\n`;
        result += "─────────────────\n";
        
        if (heirs.includes("زوجة") && heirs.includes("ابن")) {
            result += "✓ الزوجة: الثمن (1/8) لوجود الابن\n✓ الابن: الباقي تعصيباً\n\n📝 أصل المسألة: 8";
        }
        else if (heirs.includes("زوجة") && heirs.includes("بنت")) {
            result += "✓ الزوجة: الثمن (1/8) لوجود البنت\n✓ البنت: النصف (1/2) لانفرادها\n\n📝 أصل المسألة: 8\n• سهم الزوجة: 1\n• سهم البنت: 4\n• الباقي: 3 (للعصبة إن وجد)";
        }
        else if (heirs.includes("زوج") && heirs.includes("بنت")) {
            result += "✓ الزوج: الربع (1/4) لوجود البنت\n✓ البنت: النصف (1/2) لانفرادها\n\n📝 أصل المسألة: 4\n• سهم الزوج: 1\n• سهم البنت: 2\n• الباقي: 1 (للعصبة إن وجد)";
        }
        else {
            result += "هذه المسألة تحتاج إلى تحليل مفصل حسب الحالة.\nلحساب دقيق، يرجى استخدام حاسبة الميراث الرئيسية.";
        }
        
        return result;
    },
    
    getAnswer: function(question) {
        const cleanQuestion = question.toLowerCase().trim();
        
        // Extraction des héritiers
        const heirs = this.extractHeirs(cleanQuestion);
        if (heirs.length > 1) {
            const calculation = this.calculateInheritance(heirs);
            if (calculation) return calculation + "\n\n📖 المرجع: سورة النساء";
        }
        
        // Recherche dans la base de connaissances
        let bestMatch = null;
        let maxScore = 0;
        
        for (const [key, item] of Object.entries(this.knowledgeBase)) {
            for (const keyword of item.keywords) {
                if (cleanQuestion.includes(keyword.toLowerCase())) {
                    const score = keyword.length;
                    if (score > maxScore) {
                        maxScore = score;
                        bestMatch = item;
                    }
                }
            }
        }
        
        if (bestMatch) {
            return bestMatch.answer + "\n\n📖 المرجع: القرآن الكريم وقانون الأسرة الجزائري";
        }
        
        // Réponse par défaut pour les questions sur les héritiers spécifiques
        if (cleanQuestion.includes("زوجة")) return this.formatHeirInfo("زوجة");
        if (cleanQuestion.includes("زوج")) return this.formatHeirInfo("زوج");
        if (cleanQuestion.includes("أم") || cleanQuestion.includes("ام")) return this.formatHeirInfo("ام");
        if (cleanQuestion.includes("أب") || cleanQuestion.includes("اب")) return this.formatHeirInfo("اب");
        if (cleanQuestion.includes("بنت")) return this.formatHeirInfo("بنت");
        if (cleanQuestion.includes("ابن")) return this.formatHeirInfo("ابن");
        
        return "🤖 **مرحباً بك في مساعد الميراث الإسلامي**\n\n" +
               "يمكنك أن تسألني عن:\n\n" +
               "📚 **الميراث في الإسلام**\n" +
               "📖 **الآيات القرآنية:** آية 11، آية 12، آية 176\n" +
               "📜 **القانون الجزائري**\n" +
               "📊 **أنصبة الورثة:** الزوج، الزوجة، الأم، الأب، الابن، البنت\n" +
               "📝 **مصطلحات:** العول، الحجب";
    }
};

// Fonction pour utiliser le chatbot dans la page
function getChatbotResponse(question) {
    return inheritanceChatbot.getAnswer(question);
}