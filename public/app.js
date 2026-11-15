/* NAWAR GeoAI - Complete Application Engine (Pure Vanilla JS for GitHub Pages) */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. DEMO PRESETS, REGIONS & BILINGUAL I18N DICTIONARY
  // ---------------------------------------------------------------------------
  const DEMO_PRESETS = [
    {
      id: 'bisha',
      name_en: 'Bisha, Saudi Arabia',
      name_ar: 'بيشة، السعودية',
      lat: 19.98,
      lon: 42.6,
      soil: 'sandy',
      prevCrop: 'barley',
      startSeason: 'Winter',
      priority: 'water',
      note_en: 'Arid highland oasis',
      note_ar: 'واحة مرتفعات قاحلة'
    },
    {
      id: 'meknes',
      name_en: 'Meknes, Morocco',
      name_ar: 'مكناس، المغرب',
      lat: 33.89,
      lon: -5.55,
      soil: 'loamy',
      prevCrop: 'durum_wheat',
      startSeason: 'Winter',
      priority: 'soil',
      note_en: 'Semi-arid Mediterranean plain',
      note_ar: 'سهل متوسطي شبه جاف'
    },
    {
      id: 'jodhpur',
      name_en: 'Jodhpur, India',
      name_ar: 'جودبور، الهند',
      lat: 26.24,
      lon: 73.02,
      soil: 'sandy',
      prevCrop: 'pearl_millet',
      startSeason: 'Winter',
      priority: 'water',
      note_en: 'Thar Desert fringe dryland',
      note_ar: 'أطراف صحراء طهار الجافة'
    },
    {
      id: 'imperial',
      name_en: 'Imperial Valley, USA',
      name_ar: 'وادي إمبريال، أمريكا',
      lat: 32.85,
      lon: -115.57,
      soil: 'saline',
      prevCrop: 'alfalfa',
      startSeason: 'Winter',
      priority: 'profit',
      note_en: 'Hyper-arid saline basin',
      note_ar: 'حوض صحراوي مالح'
    }
  ];

  const COUNTRY_CATALOG = [
    {
      id: 'sa',
      name_en: 'Saudi Arabia',
      name_ar: 'المملكة العربية السعودية',
      regions: [
        { name_en: 'Bisha Oasis', name_ar: 'واحة بيشة', lat: 19.98, lon: 42.6, soil: 'sandy' },
        { name_en: 'Al-Ahsa Oasis', name_ar: 'واحة الأحساء', lat: 25.38, lon: 49.59, soil: 'saline' },
        { name_en: 'Qassim Plain', name_ar: 'سهل القصيم', lat: 26.33, lon: 43.97, soil: 'sandy' },
        { name_en: 'Al-Jouf Valley', name_ar: 'وادي الجوف', lat: 29.81, lon: 40.2, soil: 'loamy' }
      ]
    },
    {
      id: 'ma',
      name_en: 'Morocco',
      name_ar: 'المغرب',
      regions: [
        { name_en: 'Meknes Plain', name_ar: 'سهل مكناس', lat: 33.89, lon: -5.55, soil: 'loamy' },
        { name_en: 'Marrakech Haouz', name_ar: 'حوز مراكش', lat: 31.63, lon: -7.99, soil: 'clay' },
        { name_en: 'Souss-Massa Valley', name_ar: 'وادي سوس ماسة', lat: 30.42, lon: -9.59, soil: 'sandy' }
      ]
    },
    {
      id: 'eg',
      name_en: 'Egypt',
      name_ar: 'مصر',
      regions: [
        { name_en: 'Nile Delta (Tanta)', name_ar: 'دلتا النيل (طنطا)', lat: 30.79, lon: 31.0, soil: 'clay' },
        { name_en: 'New Valley Oasis', name_ar: 'الوادي الجديد', lat: 25.45, lon: 30.55, soil: 'sandy' },
        { name_en: 'Fayoum Depression', name_ar: 'منخفض الفيوم', lat: 29.31, lon: 30.84, soil: 'saline' }
      ]
    },
    {
      id: 'jo',
      name_en: 'Jordan',
      name_ar: 'الأردن',
      regions: [
        { name_en: 'Jordan Valley', name_ar: 'غور الأردن', lat: 32.05, lon: 35.58, soil: 'loamy' },
        { name_en: 'Mafraq Drylands', name_ar: 'أراضي المفرق الجافة', lat: 32.34, lon: 36.21, soil: 'clay' }
      ]
    },
    {
      id: 'in',
      name_en: 'India',
      name_ar: 'الهند',
      regions: [
        { name_en: 'Jodhpur (Rajasthan)', name_ar: 'جودبور (راجستان)', lat: 26.24, lon: 73.02, soil: 'sandy' },
        { name_en: 'Bikaner Dryland', name_ar: 'بيكانير الجافة', lat: 28.02, lon: 73.31, soil: 'sandy' }
      ]
    },
    {
      id: 'us',
      name_en: 'United States',
      name_ar: 'الولايات المتحدة',
      regions: [
        { name_en: 'Imperial Valley, CA', name_ar: 'وادي إمبريال، كاليفورنيا', lat: 32.85, lon: -115.57, soil: 'saline' },
        { name_en: 'Yuma Basin, AZ', name_ar: 'حوض يوما، أريزونا', lat: 32.69, lon: -114.63, soil: 'sandy' }
      ]
    }
  ];

  const SEASONS_ORDER = ['Winter', 'Spring', 'Summer', 'Autumn'];

  const SOIL_TYPES = [
    {
      id: 'sandy',
      name_en: 'Sandy',
      name_ar: 'رملي',
      desc_en: 'Fast drainage, low water retention, prone to leaching',
      desc_ar: 'سريع التصريف، قليل الاحتفاظ بالماء، عرضة لغسل المغذيات'
    },
    {
      id: 'loamy',
      name_en: 'Loamy',
      name_ar: 'طميي متوازن',
      desc_en: 'Balanced aeration, moisture holding, and root penetration',
      desc_ar: 'توازن مثالي بين التهوية والاحتفاظ بالرطوبة وتغلغل الجذور'
    },
    {
      id: 'clay',
      name_en: 'Clay',
      name_ar: 'طيني',
      desc_en: 'High water retention, surface crusting & runoff risk',
      desc_ar: 'قدرة عالية على حفظ الماء مع خطر التصلب السطحي والجريان'
    },
    {
      id: 'saline',
      name_en: 'Saline / Arid',
      name_ar: 'ملحي / قاحل',
      desc_en: 'Elevated salt stress; favors salt-tolerant dryland crops',
      desc_ar: 'إجهاد ملحي مرتفع؛ يفضل المحاصيل المتحملة للملوحة والجفاف'
    }
  ];

  const I18N = {
    en: {
      appTitle: 'NAWAR GeoAI',
      tagline: 'Helping dry lands bloom, one smart season at a time.',
      headerMeta: 'NASA Space Apps Challenge 2026 · Field Shift',
      langBtn: 'العربية',
      welcomeBadge: 'Multi-Season Agro-Climate Resilience Planner',
      welcomeTitle: 'Plan 3 Farming Seasons Ahead with NASA Satellite Data',
      welcomeDesc:
        'Pin your farm anywhere in the world, specify your soil and crop history, and let NAWAR GeoAI fetch live NASA POWER climatology and SRTM elevation to build and stress-test a 3-season rotation plan.',
      welcomePillar1Title: '01. Pin Land & NASA Telemetry',
      welcomePillar1Desc:
        'Drop a map pin or pick an arid demo site to pull live NASA POWER temperature, rainfall, solar, and SRTM elevation data.',
      welcomePillar2Title: '02. Compare 3 Rotation Strategies',
      welcomePillar2Desc:
        'Contrast Status Quo monoculture against a priority-weighted Primary Rotation and a Conservative Dryland Buffer.',
      welcomePillar3Title: '03. Stress-Test Future Climate',
      welcomePillar3Desc:
        'Simulate up to +4.0°C warming and -40% to +20% rainfall shifts to inspect water deficits and heat thresholds.',
      startJourneyBtn: 'Start Guided Farm Setup',
      demoPresetsWelcomeLabel: 'Or explore immediately with an arid demo site:',
      savedGardensTitle: 'My Saved Plots',
      wizStep1Label: '1. Region & Demo',
      wizStep2Label: '2. Exact Map Pin',
      wizStep3Label: '3. Soil & Crop',
      wizStep4Label: '4. Goal & Build',
      step1Title: 'Where is your farm or garden located?',
      step1Sub: 'Choose an arid demo site, select a country and city, or jump straight to pinning your coordinates on the map.',
      useGpsDirectBtn: 'Use My GPS Location',
      demoPresetsTitle: 'One-Click Arid Demo Sites',
      selectCountryPrompt: 'Or Browse by Country',
      chooseRegionTitle: 'Select or Filter Your City / Region',
      searchCityBtn: 'Find City',
      notInListBtn: 'Pin Any Custom Coordinates on the Interactive Map',
      step2Title: 'Pin your exact farm or garden on the map',
      step2Sub: 'Click anywhere on the map or drag the marker to capture exact latitude and longitude for NASA POWER & SRTM queries.',
      selectedAreaLabel: 'Selected Area:',
      quickDemoLabel: 'Arid Demo Presets:',
      mapLayerStreet: 'Street Map',
      mapLayerSat: 'Satellite View',
      useGpsBtn: 'My GPS Location',
      latLabel: 'Latitude',
      lonLabel: 'Longitude',
      backBtn: 'Back',
      confirmLocationBtn: 'Confirm Location & Continue',
      step3Title: 'Tell us about your soil and last crop',
      step3Sub: 'Crop rotation rules penalize repeating the same botanical family and reward nitrogen cycling after heavy feeders.',
      soilTypeLabel: 'Soil Type',
      soilTypeShort: 'Soil Type',
      prevCropLabel: 'Previous Crop (from crops.json)',
      startSeasonLabel: 'Starting Season',
      startSeasonShort: 'Starting Season',
      priorityShort: 'Farmer Priority',
      nextBtn: 'Continue',
      step4Title: 'What is your main priority for the next 3 seasons?',
      step4Sub: 'We build 3 strategies for comparison and weight the Primary Recommended plan toward your chosen goal.',
      prio_water: 'Save Water',
      prio_water_sub: 'Favor low-ET, drought-tolerant crops with minimal irrigation deficit.',
      prio_profit: 'Maximize Profit',
      prio_profit_sub: 'Favor high net-return cash crops suited to local thermal limits.',
      prio_soil: 'Improve Soil Health',
      prio_soil_sub: 'Favor Fabaceae nitrogen fixers, deep roots, and anti-erosion cover.',
      gardenNameLabel: 'Farm / Plot Name (Optional)',
      reviewSummaryTitle: 'Farm Configuration Summary',
      generateBtn: 'Fetch NASA Data & Build 3-Season Plan',
      step1: '1. Location & Map',
      step2: '2. Farm Inputs',
      step3: '3. NASA Data',
      step4: '4. 3 Strategies',
      step5: '5. Season Plan',
      step6: '6. Stress Test',
      step7: '7. Local Review',
      switchGardenLabel: 'Active Plot:',
      addGardenBtn: '+ Plan Another Plot',
      editLocationBtn: 'Wizard: Location',
      editInputsBtn: 'Edit Soil / Crop / Goal',
      newFarmBtn: 'Home',
      dashMapTitle: 'Interactive Farm Map & Arid Benchmarks',
      dashMapSub: 'Click anywhere on the map to relocate the farm pin and refresh live NASA POWER + SRTM data.',
      quickAdjustTitle: 'Adjust Field Parameters',
      nasaPanelTitle: 'NASA Earth Observation & Terrain Summary',
      nasaPanelSub: 'Climatology from NASA POWER Agroclimatology API + SRTM Elevation & Runoff Risk',
      nasaSourceLive: 'Live NASA Data',
      nasaSourceFallback: 'Offline Fallback Estimate',
      metricMaxTemp: 'Peak / Mean Max Temp',
      metricMinTemp: 'Coolest / Mean Min Temp',
      metricRain: 'Annual Rainfall',
      metricSolar: 'Solar Irradiance',
      metricElev: 'SRTM Elevation & Runoff',
      strategiesTitle: '3-Strategy Comparison Engine',
      strategySelectHint: 'Compare Status Quo monoculture against the Primary Recommended Rotation and Conservative Dryland Buffer.',
      seasonCardsTitle: '3-Season Rotation Breakdown',
      planTableClickHint: 'Inspect agronomic roles, water demand, and field risk indicators. Click any season for full crop diagnostics.',
      colSeason: 'Season',
      colCrop: 'Crop & Family',
      colReason: 'Agronomic Rationale',
      colWater: 'Water Need vs Rain',
      colRisk: 'Stress Status',
      colReturn: 'Est. Net Return',
      scenarioTitle: 'Climate Scenario Stress-Testing',
      scenarioSubtitle: 'Use quick presets or live sliders to test crop heat-stress thresholds and water deficits across all 3 seasons.',
      presetBaseline: 'Baseline',
      presetWarm2: '+2°C Warming',
      presetDry20: '-20% Rainfall',
      tempSliderLabel: 'Temperature Shift',
      rainSliderLabel: 'Rainfall Change',
      chartWaterTitle: 'Seasonal Crop Water Demand vs. Effective Rainfall (mm)',
      chartStrategiesTitle: 'Scenario Resilience Across 3 Strategies (Pass Score /3)',
      infoGapsTitle: 'Information Gaps & Local Review',
      infoGapsLead: 'NAWAR GeoAI supports rather than replaces farmer judgment. Verify these critical field conditions locally before planting:',
      fieldNodeTitle: 'Satellite vs. Ground Truth: NAWAR Field Node',
      fieldNodeDesc: 'NASA POWER climatology grids (~55 km) and SMAP pixels (9–36 km) capture regional climate but miss field-level microclimates. Our low-cost NAWAR Field Node soil moisture & temperature probe bridges that last-meter gap.',
      fnStep1Title: '1. Satellite Grid (~55 km)',
      fnStep1Desc: 'NASA POWER & SRTM provide regional temperature, rainfall, solar radiation, and elevation baselines.',
      fnStep2Title: '2. NAWAR Field Node',
      fnStep2Desc: 'In-field root-zone probe logs real soil moisture (%) and canopy-level temperature every 15 minutes.',
      fnStep3Title: '3. Calibrated Plan',
      fnStep3Desc: 'Sensor residuals bias-correct satellite ET and trigger localized irrigation and heat-stress alerts.',
      dsActive: 'Live API',
      dsDescPower: 'T2M_MAX, T2M_MIN, PRECTOTCORR & ALLSKY_SFC_SW_DWN.',
      dsDescSrtm: 'Terrain elevation (m) for runoff and drainage risk checks.',
      glossaryTitle: "Farmer's Science Glossary",
      glossaryToggleHint: 'Click to expand key agronomy & climate terms',
      analyzingTitle: 'Building Your 3-Season Smart Plan',
      analyzingStep1: 'Querying NASA POWER satellite climatology & SRTM elevation...',
      analyzingStep2: 'Calculating seasonal water balance & thermal suitability...',
      analyzingStep3: 'Comparing Status Quo, Primary Recommended & Dryland Buffer rotations...',
      analyzingStep4: 'Running +2°C warming & -20% rainfall stress diagnostics...',
      modalCloseBtn: 'Close',
      footerText: 'NAWAR GeoAI · Built for NASA Space Apps Challenge 2026 ("Field Shift: Adapting Farms with NASA Data")',
      seasonWord: 'Season',
      seasons: { Winter: 'Winter', Spring: 'Spring', Summer: 'Summer', Autumn: 'Autumn' },
      roles: {
        'Nitrogen-Fixing': 'Nitrogen-Fixing',
        'Deep-Rooting': 'Deep-Rooting',
        'Cover / Anti-Erosion': 'Cover / Anti-Erosion',
        'Drought-Tolerant': 'Drought-Tolerant'
      },
      benefits: {
        interrupts: 'Interrupts Pest Cycle',
        erosion: 'Prevents Bare-Soil Erosion',
        heat_et: 'Peak Heat/ET Vulnerability',
        monoculture: 'Monoculture Pest & Depletion Risk'
      }
    },
    ar: {
      appTitle: 'نَوّار GeoAI',
      tagline: 'نساعد الأراضي الجافة على الإزهار، موسماً ذكياً تلو الآخر.',
      headerMeta: 'تحدي ناسا لتطبيقات الفضاء 2026 · تحوّل الحقول',
      langBtn: 'English',
      welcomeBadge: 'مخطط مرونة المناخ والدورة الزراعية لـ 3 مواسم',
      welcomeTitle: 'خطط لـ 3 مواسم زراعية قادمة ببيانات أقمار ناسا الصناعية',
      welcomeDesc:
        'حدد موقع مزرعتك في أي مكان بالعالم، وأدخل نوع التربة والمحصول السابق، ليقوم نَوّار GeoAI بجلب بيانات مناخ NASA POWER وارتفاع SRTM لبناء واختبار خطة تدوير من 3 مواسم.',
      welcomePillar1Title: '01. تحديد الأرض وبيانات ناسا',
      welcomePillar1Desc:
        'ثبت الدبوس على الخريطة أو اختر موقعاً تجريبياً جافاً لجلب الحرارة والأمطار والإشعاع الشمسي والارتفاع مباشرة.',
      welcomePillar2Title: '02. مقارنة 3 استراتيجيات تدوير',
      welcomePillar2Desc:
        'قارن بين الزراعة الأحادية التقليدية والخطة الموصى بها حسب أولويتك وخطة الحماية الجافة المحافظة.',
      welcomePillar3Title: '03. اختبار الإجهاد المناخي المستقبلي',
      welcomePillar3Desc:
        'اختبر ارتفاع الحرارة حتى +4.0°م وتغير الأمطار من -40% إلى +20% لكشف العجز المائي وحدود الإجهاد الحراري.',
      startJourneyBtn: 'ابدأ إعداد المزرعة الموجّه',
      demoPresetsWelcomeLabel: 'أو استكشف فوراً باستخدام أحد المواقع التجريبية الجافة:',
      savedGardensTitle: 'مزارعي المحفوظة',
      wizStep1Label: '1. المنطقة والتجربة',
      wizStep2Label: '2. موقع الخريطة',
      wizStep3Label: '3. التربة والمحصول',
      wizStep4Label: '4. الأولوية والبناء',
      step1Title: 'أين تقع مزرعتك أو حديقتك؟',
      step1Sub: 'اختر موقعاً تجريبياً جافاً، أو تصفح حسب الدولة والمدينة، أو ثبّت الإحداثيات مباشرة على الخريطة.',
      useGpsDirectBtn: 'استخدام موقعي عبر GPS',
      demoPresetsTitle: 'مواقع تجريبية جافة بنقرة واحدة',
      selectCountryPrompt: 'أو تصفح حسب الدولة',
      chooseRegionTitle: 'اختر أو ابحث عن مدينتك / منطقتك',
      searchCityBtn: 'بحث عن مدينة',
      notInListBtn: 'تثبيت أي إحداثيات مخصصة على الخريطة التفاعلية',
      step2Title: 'ثبّت موقع مزرعتك بدقة على الخريطة',
      step2Sub: 'انقر في أي مكان على الخريطة أو اسحب المؤشر لالتقاط خط العرض والطول لبيانات NASA POWER وSRTM.',
      selectedAreaLabel: 'المنطقة المختارة:',
      quickDemoLabel: 'مواقع تجريبية سريعة:',
      mapLayerStreet: 'خريطة الشوارع',
      mapLayerSat: 'صورة القمر الصناعي',
      useGpsBtn: 'موقعي GPS',
      latLabel: 'خط العرض (Latitude)',
      lonLabel: 'خط الطول (Longitude)',
      backBtn: 'رجوع',
      confirmLocationBtn: 'تأكيد الموقع والمتابعة',
      step3Title: 'أخبرنا عن تربتك والمحصول السابق',
      step3Sub: 'تمنع قواعد التدوير تكرار نفس العائلة النباتية وتكافئ تثبيت النيتروجين بعد المحاصيل المجهدة.',
      soilTypeLabel: 'نوع التربة',
      soilTypeShort: 'نوع التربة',
      prevCropLabel: 'المحصول السابق (من قاعدة crops.json)',
      startSeasonLabel: 'موسم البداية',
      startSeasonShort: 'موسم البداية',
      priorityShort: 'أولوية المزارع',
      nextBtn: 'متابعة',
      step4Title: 'ما هي أولويتك الأساسية للمواسم الثلاثة القادمة؟',
      step4Sub: 'نبني 3 استراتيجيات للمقارنة ونرجح الخطة الموصى بها حسب هدفك المختار.',
      prio_water: 'توفير المياه',
      prio_water_sub: 'تفضيل المحاصيل منخفضة البخر-نتح والمقاومة للجفاف بأقل عجز ري.',
      prio_profit: 'تعظيم العائد المالي',
      prio_profit_sub: 'تفضيل المحاصيل النقدية عالية العائد الملائمة للحدود الحرارية المحلية.',
      prio_soil: 'تحسين صحة التربة',
      prio_soil_sub: 'تفضيل البقوليات المثبتة للنيتروجين والجذور العميقة والغطاء المانع للتعرية.',
      gardenNameLabel: 'اسم المزرعة / الحقل (اختياري)',
      reviewSummaryTitle: 'ملخص إعدادات المزرعة',
      generateBtn: 'جلب بيانات ناسا وبناء خطة 3 مواسم',
      step1: '1. الموقع والخريطة',
      step2: '2. مدخلات الحقل',
      step3: '3. بيانات ناسا',
      step4: '4. 3 استراتيجيات',
      step5: '5. خطة المواسم',
      step6: '6. اختبار المناخ',
      step7: '7. المراجعة المحلية',
      switchGardenLabel: 'الحقل النشط:',
      addGardenBtn: '+ تخطيط حقل آخر',
      editLocationBtn: 'تغيير الموقع',
      editInputsBtn: 'تعديل التربة / الهدف',
      newFarmBtn: 'الرئيسية',
      dashMapTitle: 'خريطة المزرعة التفاعلية والمواقع القياسية الجافة',
      dashMapSub: 'انقر في أي مكان على الخريطة لنقل الدبوس وتحديث بيانات NASA POWER وSRTM فوراً.',
      quickAdjustTitle: 'ضبط معاملات الحقل',
      nasaPanelTitle: 'ملخص رصد الأرض من ناسا والتضاريس',
      nasaPanelSub: 'بيانات المناخ من NASA POWER الزراعية + ارتفاع SRTM ومخاطر الجريان السطحي',
      nasaSourceLive: 'بيانات ناسا المباشرة',
      nasaSourceFallback: 'تقدير محلي دون اتصال',
      metricMaxTemp: 'ذروة / متوسط الحرارة العظمى',
      metricMinTemp: 'أدنى / متوسط الحرارة الصغرى',
      metricRain: 'الأمطار السنوية',
      metricSolar: 'الإشعاع الشمسي',
      metricElev: 'ارتفاع SRTM والجريان',
      strategiesTitle: 'محرك مقارنة الاستراتيجيات الثلاث',
      strategySelectHint: 'قارن بين الوضع القائم (تکرار المحصول) والخطة الموصى بها وخطة الحماية الجافة المحافظة.',
      seasonCardsTitle: 'تفصيل التدوير لـ 3 مواسم',
      planTableClickHint: 'استعرض الدور الزراعي والاحتياج المائي ومخاطر الحقل. انقر على أي موسم لتفاصيل المحصول الكاملة.',
      colSeason: 'الموسم',
      colCrop: 'المحصول والعائلة',
      colReason: 'التفسير الزراعي',
      colWater: 'الاحتياج مقابل المطر',
      colRisk: 'حالة الإجهاد',
      colReturn: 'صافي العائد التقديري',
      scenarioTitle: 'اختبار الإجهاد المناخي التفاعلي',
      scenarioSubtitle: 'استخدم الأزرار السريعة أو المنزلقات الحية لاختبار حدود الإجهاد الحراري والعجز المائي عبر المواسم الثلاثة.',
      presetBaseline: 'الوضع الأساسي',
      presetWarm2: 'احترار +2°م',
      presetDry20: 'نقص أمطار -20%',
      tempSliderLabel: 'إزاحة الحرارة',
      rainSliderLabel: 'تغير الأمطار',
      chartWaterTitle: 'الاحتياج المائي للمحصول مقابل المطر الفعال (ملم)',
      chartStrategiesTitle: 'مرونة الاستراتيجيات الثلاث عبر السيناريوهات (من 3)',
      infoGapsTitle: 'فجوات المعلومات والمراجعة الميدانية',
      infoGapsLead: 'يدعم نَوّار GeoAI قرار المزارع ولا يحل محله. تحقق من هذه العوامل الميدانية محلياً قبل الزراعة:',
      fieldNodeTitle: 'القمر الصناعي مقابل الحقل: عقدة نَوّار الميدانية',
      fieldNodeDesc: 'تغطي شبكات NASA POWER (~55 كم) وSMAP (9-36 كم) المناخ الإقليمي لكنها تغفل المناخ الدقيق للحقل. تقوم عقدة نَوّار منخفضة التكلفة بقياس رطوبة وحرارة التربة لمعايرة تقديرات الفضاء.',
      fnStep1Title: '1. شبكة الأقمار (~55 كم)',
      fnStep1Desc: 'توفر NASA POWER وSRTM خطوط الأساس للحرارة والأمطار والإشعاع الشمسي والارتفاع.',
      fnStep2Title: '2. عقدة نَوّار الحقلية',
      fnStep2Desc: 'يقيس المجس الميداني رطوبة التربة الفعلية (%) وحرارة منطقة الجذور كل 15 دقيقة.',
      fnStep3Title: '3. خطة معايرة',
      fnStep3Desc: 'تصحح قراءات المجس حسابات البخر-نتح وتطلق تنبيهات الري والإجهاد الحراري بدقة.',
      dsActive: 'واجهة مباشرة',
      dsDescPower: 'الحرارة العظمى والصغرى والأمطار والإشعاع الشمسي.',
      dsDescSrtm: 'الارتفاع التضاريسي (م) لتقييم مخاطر الجريان والتصريف.',
      glossaryTitle: 'قاموس المزارع العلمي',
      glossaryToggleHint: 'انقر لعرض شرح المصطلحات الزراعية والمناخية',
      analyzingTitle: 'جاري بناء خطتك الذكية لـ 3 مواسم',
      analyzingStep1: 'الاتصال ببيانات ناسا المناخية وارتفاع SRTM...',
      analyzingStep2: 'حساب الميزان المائي والملاءمة الحرارية لكل موسم...',
      analyzingStep3: 'مقارنة الوضع القائم والخطة الموصى بها وخطة الحماية الجافة...',
      analyzingStep4: 'تشغيل اختبارات الإجهاد (+2°م ونقص أمطار -20%)...',
      modalCloseBtn: 'إغلاق',
      footerText: 'نَوّار GeoAI · طُوّر لتحدي ناسا لتطبيقات الفضاء 2026 ("تحوّل الحقول: تكييف المزارع ببيانات ناسا")',
      seasonWord: 'الموسم',
      seasons: { Winter: 'الشتاء', Spring: 'الربيع', Summer: 'الصيف', Autumn: 'الخريف' },
      roles: {
        'Nitrogen-Fixing': 'مثبت للنيتروجين',
        'Deep-Rooting': 'عميق الجذور',
        'Cover / Anti-Erosion': 'غطاء / مانع للتعرية',
        'Drought-Tolerant': 'متحمل للجفاف'
      },
      benefits: {
        interrupts: 'يكسر دورة الآفات',
        erosion: 'يمنع تعرية التربة المكشوفة',
        heat_et: 'حساسية لذروة الحر/البخر',
        monoculture: 'خطر استنزاف التربة والآفات'
      }
    }
  };

  // Fallback crops in case the HTML is opened via file:// where fetch('crops.json') is restricted
  const FALLBACK_CROPS = [
    { id: 'barley', name: 'Barley', name_ar: 'الشعير', family: 'Poaceae', water_mm: 280, opt_temp_c: { min: 12, max: 24 }, max_temp_c: 34, soil_scores: { sandy: 0.78, loamy: 0.94, clay: 0.86, saline: 0.88 }, nitrogen_role: 'heavy_feeder', root_depth: 'medium', net_return_usd_ha: 920, forage_value: 'high', preferred_seasons: ['Winter', 'Autumn'], functional_role: 'Drought-Tolerant', drought_tolerance: 0.9 },
    { id: 'sorghum', name: 'Sorghum', name_ar: 'الذرة الرفيعة', family: 'Poaceae', water_mm: 340, opt_temp_c: { min: 22, max: 34 }, max_temp_c: 42, soil_scores: { sandy: 0.82, loamy: 0.95, clay: 0.88, saline: 0.76 }, nitrogen_role: 'heavy_feeder', root_depth: 'deep', net_return_usd_ha: 1080, forage_value: 'high', preferred_seasons: ['Spring', 'Summer'], functional_role: 'Deep-Rooting', drought_tolerance: 0.88 },
    { id: 'pearl_millet', name: 'Pearl Millet', name_ar: 'الدخن اللؤلؤي', family: 'Poaceae', water_mm: 240, opt_temp_c: { min: 24, max: 36 }, max_temp_c: 44, soil_scores: { sandy: 0.95, loamy: 0.9, clay: 0.7, saline: 0.82 }, nitrogen_role: 'heavy_feeder', root_depth: 'deep', net_return_usd_ha: 840, forage_value: 'high', preferred_seasons: ['Spring', 'Summer'], functional_role: 'Drought-Tolerant', drought_tolerance: 0.95 },
    { id: 'durum_wheat', name: 'Durum Wheat', name_ar: 'القمح الصلب', family: 'Poaceae', water_mm: 380, opt_temp_c: { min: 12, max: 23 }, max_temp_c: 32, soil_scores: { sandy: 0.68, loamy: 0.96, clay: 0.9, saline: 0.62 }, nitrogen_role: 'heavy_feeder', root_depth: 'medium', net_return_usd_ha: 1280, forage_value: 'medium', preferred_seasons: ['Winter', 'Autumn'], functional_role: 'Drought-Tolerant', drought_tolerance: 0.72 },
    { id: 'teff', name: 'Teff', name_ar: 'التف', family: 'Poaceae', water_mm: 260, opt_temp_c: { min: 18, max: 29 }, max_temp_c: 37, soil_scores: { sandy: 0.76, loamy: 0.92, clay: 0.89, saline: 0.68 }, nitrogen_role: 'neutral', root_depth: 'shallow', net_return_usd_ha: 1150, forage_value: 'high', preferred_seasons: ['Spring', 'Autumn'], functional_role: 'Cover / Anti-Erosion', drought_tolerance: 0.84 },
    { id: 'chickpea', name: 'Chickpea', name_ar: 'الحمص', family: 'Fabaceae', water_mm: 270, opt_temp_c: { min: 14, max: 26 }, max_temp_c: 35, soil_scores: { sandy: 0.8, loamy: 0.95, clay: 0.78, saline: 0.58 }, nitrogen_role: 'fixes', root_depth: 'deep', net_return_usd_ha: 1340, forage_value: 'medium', preferred_seasons: ['Winter', 'Spring'], functional_role: 'Nitrogen-Fixing', drought_tolerance: 0.86 },
    { id: 'cowpea', name: 'Cowpea', name_ar: 'اللوبيا الجافة', family: 'Fabaceae', water_mm: 250, opt_temp_c: { min: 22, max: 34 }, max_temp_c: 41, soil_scores: { sandy: 0.92, loamy: 0.93, clay: 0.76, saline: 0.7 }, nitrogen_role: 'fixes', root_depth: 'medium', net_return_usd_ha: 1190, forage_value: 'high', preferred_seasons: ['Spring', 'Summer'], functional_role: 'Nitrogen-Fixing', drought_tolerance: 0.91 },
    { id: 'faba_bean', name: 'Faba Bean', name_ar: 'الفول البلدي', family: 'Fabaceae', water_mm: 320, opt_temp_c: { min: 10, max: 22 }, max_temp_c: 30, soil_scores: { sandy: 0.65, loamy: 0.95, clay: 0.9, saline: 0.64 }, nitrogen_role: 'fixes', root_depth: 'medium', net_return_usd_ha: 1420, forage_value: 'medium', preferred_seasons: ['Winter', 'Autumn'], functional_role: 'Nitrogen-Fixing', drought_tolerance: 0.7 },
    { id: 'lentil', name: 'Lentil', name_ar: 'العدس', family: 'Fabaceae', water_mm: 230, opt_temp_c: { min: 12, max: 24 }, max_temp_c: 33, soil_scores: { sandy: 0.81, loamy: 0.94, clay: 0.82, saline: 0.6 }, nitrogen_role: 'fixes', root_depth: 'shallow', net_return_usd_ha: 1260, forage_value: 'medium', preferred_seasons: ['Winter', 'Spring'], functional_role: 'Nitrogen-Fixing', drought_tolerance: 0.88 },
    { id: 'alfalfa', name: 'Dryland Alfalfa', name_ar: 'البرسيم الجاف', family: 'Fabaceae', water_mm: 410, opt_temp_c: { min: 16, max: 30 }, max_temp_c: 39, soil_scores: { sandy: 0.78, loamy: 0.96, clay: 0.84, saline: 0.78 }, nitrogen_role: 'fixes', root_depth: 'deep', net_return_usd_ha: 1390, forage_value: 'high', preferred_seasons: ['Spring', 'Autumn', 'Winter'], functional_role: 'Cover / Anti-Erosion', drought_tolerance: 0.76 },
    { id: 'sesame', name: 'Sesame', name_ar: 'السمسم', family: 'Pedaliaceae', water_mm: 275, opt_temp_c: { min: 24, max: 35 }, max_temp_c: 42, soil_scores: { sandy: 0.91, loamy: 0.94, clay: 0.68, saline: 0.72 }, nitrogen_role: 'neutral', root_depth: 'deep', net_return_usd_ha: 1520, forage_value: 'low', preferred_seasons: ['Spring', 'Summer'], functional_role: 'Deep-Rooting', drought_tolerance: 0.89 },
    { id: 'okra', name: 'Dryland Okra', name_ar: 'البامية', family: 'Malvaceae', water_mm: 350, opt_temp_c: { min: 23, max: 35 }, max_temp_c: 41, soil_scores: { sandy: 0.84, loamy: 0.94, clay: 0.8, saline: 0.72 }, nitrogen_role: 'neutral', root_depth: 'deep', net_return_usd_ha: 1680, forage_value: 'low', preferred_seasons: ['Spring', 'Summer'], functional_role: 'Deep-Rooting', drought_tolerance: 0.82 },
    { id: 'desert_watermelon', name: 'Desert Watermelon', name_ar: 'البطيخ الصحراوي', family: 'Cucurbitaceae', water_mm: 290, opt_temp_c: { min: 22, max: 34 }, max_temp_c: 40, soil_scores: { sandy: 0.96, loamy: 0.9, clay: 0.62, saline: 0.71 }, nitrogen_role: 'neutral', root_depth: 'deep', net_return_usd_ha: 1590, forage_value: 'low', preferred_seasons: ['Spring', 'Summer'], functional_role: 'Cover / Anti-Erosion', drought_tolerance: 0.85 },
    { id: 'quinoa', name: 'Quinoa', name_ar: 'الكينوا', family: 'Amaranthaceae', water_mm: 220, opt_temp_c: { min: 12, max: 25 }, max_temp_c: 35, soil_scores: { sandy: 0.87, loamy: 0.92, clay: 0.77, saline: 0.95 }, nitrogen_role: 'neutral', root_depth: 'deep', net_return_usd_ha: 1640, forage_value: 'medium', preferred_seasons: ['Winter', 'Spring', 'Autumn'], functional_role: 'Drought-Tolerant', drought_tolerance: 0.93 }
  ];

  // ---------------------------------------------------------------------------
  // 2. APPLICATION STATE
  // ---------------------------------------------------------------------------
  const STORAGE_KEY = 'nawar_geoai_saved_plots_v2';

  const state = {
    lang: 'en',
    stage: 'welcome', // 'welcome' | 'wizard' | 'dashboard'
    wizStep: 1,
    crops: [],
    selectedCountryId: null,
    selectedPresetId: 'bisha',
    locationName_en: 'Bisha, Saudi Arabia',
    locationName_ar: 'بيشة، السعودية',
    lat: 19.98,
    lon: 42.6,
    soil: 'sandy',
    prevCrop: 'barley',
    startSeason: 'Winter',
    priority: 'water',
    gardenName: '',
    activePlotId: null,
    savedPlots: [],

    // NASA + SRTM Data
    climateData: null,

    // Strategies & Stress Testing
    strategies: [],
    activeStrategyId: 'recommended',
    tempShift: 0.0,
    rainShift: 0,

    // Map & Chart instances
    mapLayerMode: 'street',
    wizMap: null,
    wizMarker: null,
    wizLayers: null,
    dashMap: null,
    dashMarker: null,
    dashLayers: null,
    waterChart: null,
    scenarioChart: null
  };

  // ---------------------------------------------------------------------------
  // 3. UTILITIES & I18N HELPERS
  // ---------------------------------------------------------------------------
  function $(id) {
    return document.getElementById(id);
  }

  function t(key) {
    const dict = I18N[state.lang] || I18N.en;
    return dict[key] !== undefined ? dict[key] : key;
  }

  function getCropName(crop) {
    if (!crop) return '-';
    return state.lang === 'ar' && crop.name_ar ? crop.name_ar : crop.name;
  }

  function getSeasonLabel(seasonKey) {
    const dict = I18N[state.lang].seasons || {};
    return dict[seasonKey] || seasonKey;
  }

  function getSoilLabel(soilId) {
    const s = SOIL_TYPES.find((item) => item.id === soilId) || SOIL_TYPES[0];
    return state.lang === 'ar' ? s.name_ar : s.name_en;
  }

  function getPriorityLabel(prioId) {
    return t('prio_' + prioId);
  }

  function getNextThreeSeasons(startSeason) {
    const idx = SEASONS_ORDER.indexOf(startSeason);
    const start = idx === -1 ? 0 : idx;
    return [
      SEASONS_ORDER[start % 4],
      SEASONS_ORDER[(start + 1) % 4],
      SEASONS_ORDER[(start + 2) % 4]
    ];
  }

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  // ---------------------------------------------------------------------------
  // 4. NASA POWER API + SRTM ELEVATION FETCHERS WITH DETERMINISTIC FALLBACK
  // ---------------------------------------------------------------------------
  function buildOfflineFallbackClimate(lat, lon) {
    const absLat = Math.abs(lat);
    const isSouthern = lat < 0;
    const baseMean = clamp(30 - absLat * 0.42, 8, 33);
    const annualAmp = clamp(6 + absLat * 0.22, 5, 14);
    const aridityFactor = absLat >= 15 && absLat <= 35 ? 0.42 : 1.0;
    const annualRain = Math.round(clamp((480 - absLat * 4) * aridityFactor, 55, 850));

    const seasonalWeights = isSouthern
      ? { Winter: 0.14, Spring: 0.24, Summer: 0.42, Autumn: 0.2 }
      : { Winter: 0.44, Spring: 0.28, Summer: 0.08, Autumn: 0.2 };

    const seasonal = {
      Winter: {
        tmax: Number((baseMean - annualAmp * 0.45 + 4).toFixed(1)),
        tmin: Number((baseMean - annualAmp * 0.85).toFixed(1)),
        rain_mm: Math.round(annualRain * seasonalWeights.Winter),
        solar: Number((4.8 - absLat * 0.03).toFixed(2))
      },
      Spring: {
        tmax: Number((baseMean + annualAmp * 0.35 + 5).toFixed(1)),
        tmin: Number((baseMean - 1.5).toFixed(1)),
        rain_mm: Math.round(annualRain * seasonalWeights.Spring),
        solar: Number((6.2 - absLat * 0.02).toFixed(2))
      },
      Summer: {
        tmax: Number((baseMean + annualAmp * 0.95 + 6).toFixed(1)),
        tmin: Number((baseMean + annualAmp * 0.35).toFixed(1)),
        rain_mm: Math.round(annualRain * seasonalWeights.Summer),
        solar: Number((7.1 - absLat * 0.02).toFixed(2))
      },
      Autumn: {
        tmax: Number((baseMean + annualAmp * 0.15 + 5).toFixed(1)),
        tmin: Number((baseMean - 2.0).toFixed(1)),
        rain_mm: Math.round(annualRain * seasonalWeights.Autumn),
        solar: Number((5.4 - absLat * 0.02).toFixed(2))
      }
    };

    const pseudoElev = Math.round(120 + ((Math.abs(Math.sin(lat * 3.1 + lon * 1.7)) * 850) % 900));

    return {
      source: 'fallback',
      nasaLive: false,
      srtmLive: false,
      annualRainMm: annualRain,
      meanMaxC: Number(
        ((seasonal.Winter.tmax + seasonal.Spring.tmax + seasonal.Summer.tmax + seasonal.Autumn.tmax) / 4).toFixed(1)
      ),
      peakMaxC: Math.max(seasonal.Winter.tmax, seasonal.Spring.tmax, seasonal.Summer.tmax, seasonal.Autumn.tmax),
      meanMinC: Number(
        ((seasonal.Winter.tmin + seasonal.Spring.tmin + seasonal.Summer.tmin + seasonal.Autumn.tmin) / 4).toFixed(1)
      ),
      coolestMinC: Math.min(seasonal.Winter.tmin, seasonal.Spring.tmin, seasonal.Summer.tmin, seasonal.Autumn.tmin),
      annualSolar: Number(
        ((seasonal.Winter.solar + seasonal.Spring.solar + seasonal.Summer.solar + seasonal.Autumn.solar) / 4).toFixed(2)
      ),
      elevationM: pseudoElev,
      seasonal
    };
  }

  function parseNasaPowerClimatology(json, lat) {
    const params = json && json.properties && json.properties.parameter;
    if (!params || !params.T2M_MAX || !params.T2M_MIN || !params.PRECTOTCORR || !params.ALLSKY_SFC_SW_DWN) {
      throw new Error('Incomplete NASA POWER payload');
    }

    const monthDays = {
      JAN: 31, FEB: 28, MAR: 31, APR: 30, MAY: 31, JUN: 30,
      JUL: 31, AUG: 31, SEP: 30, OCT: 31, NOV: 30, DEC: 31
    };

    const isSouthern = lat < 0;
    const seasonMonths = isSouthern
      ? {
          Winter: ['JUN', 'JUL', 'AUG'],
          Spring: ['SEP', 'OCT', 'NOV'],
          Summer: ['DEC', 'JAN', 'FEB'],
          Autumn: ['MAR', 'APR', 'MAY']
        }
      : {
          Winter: ['DEC', 'JAN', 'FEB'],
          Spring: ['MAR', 'APR', 'MAY'],
          Summer: ['JUN', 'JUL', 'AUG'],
          Autumn: ['SEP', 'OCT', 'NOV']
        };

    const cleanVal = (obj, m, fallback) => {
      const v = obj[m];
      return typeof v === 'number' && v > -900 ? v : fallback;
    };

    const seasonal = {};
    let totalRain = 0;

    SEASONS_ORDER.forEach((season) => {
      const months = seasonMonths[season];
      let tmaxSum = 0;
      let tminSum = 0;
      let solarSum = 0;
      let rainMm = 0;

      months.forEach((m) => {
        tmaxSum += cleanVal(params.T2M_MAX, m, 28);
        tminSum += cleanVal(params.T2M_MIN, m, 14);
        solarSum += cleanVal(params.ALLSKY_SFC_SW_DWN, m, 5.5);
        const precipRate = Math.max(0, cleanVal(params.PRECTOTCORR, m, 0.3));
        rainMm += precipRate * monthDays[m];
      });

      const roundedRain = Math.round(rainMm);
      totalRain += roundedRain;

      seasonal[season] = {
        tmax: Number((tmaxSum / 3).toFixed(1)),
        tmin: Number((tminSum / 3).toFixed(1)),
        rain_mm: roundedRain,
        solar: Number((solarSum / 3).toFixed(2))
      };
    });

    const annSolar = cleanVal(params.ALLSKY_SFC_SW_DWN, 'ANN', 5.6);

    return {
      annualRainMm: totalRain,
      meanMaxC: Number(
        ((seasonal.Winter.tmax + seasonal.Spring.tmax + seasonal.Summer.tmax + seasonal.Autumn.tmax) / 4).toFixed(1)
      ),
      peakMaxC: Math.max(seasonal.Winter.tmax, seasonal.Spring.tmax, seasonal.Summer.tmax, seasonal.Autumn.tmax),
      meanMinC: Number(
        ((seasonal.Winter.tmin + seasonal.Spring.tmin + seasonal.Summer.tmin + seasonal.Autumn.tmin) / 4).toFixed(1)
      ),
      coolestMinC: Math.min(seasonal.Winter.tmin, seasonal.Spring.tmin, seasonal.Summer.tmin, seasonal.Autumn.tmin),
      annualSolar: Number(annSolar.toFixed(2)),
      seasonal
    };
  }

  async function fetchWithTimeout(url, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function fetchNasaAndElevation(lat, lon) {
    const fallback = buildOfflineFallbackClimate(lat, lon);
    const nasaUrl = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=T2M_MAX,T2M_MIN,PRECTOTCORR,ALLSKY_SFC_SW_DWN&community=AG&longitude=${lon.toFixed(4)}&latitude=${lat.toFixed(4)}&format=JSON`;
    const elevUrl = `https://api.open-meteo.com/v1/elevation?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}`;

    const [nasaResult, elevResult] = await Promise.allSettled([
      fetchWithTimeout(nasaUrl, 9000),
      fetchWithTimeout(elevUrl, 7000)
    ]);

    let parsedNasa = null;
    if (nasaResult.status === 'fulfilled') {
      try {
        parsedNasa = parseNasaPowerClimatology(nasaResult.value, lat);
      } catch (_err) {
        parsedNasa = null;
      }
    }

    let elevationM = fallback.elevationM;
    let srtmLive = false;
    if (
      elevResult.status === 'fulfilled' &&
      elevResult.value &&
      Array.isArray(elevResult.value.elevation) &&
      typeof elevResult.value.elevation[0] === 'number'
    ) {
      elevationM = Math.round(elevResult.value.elevation[0]);
      srtmLive = true;
    }

    if (parsedNasa) {
      return {
        ...parsedNasa,
        elevationM,
        nasaLive: true,
        srtmLive,
        source: 'live'
      };
    }

    return {
      ...fallback,
      elevationM,
      srtmLive
    };
  }

  function assessRunoffRisk(elevationM, soilId) {
    const isAr = state.lang === 'ar';
    if (elevationM >= 950 && soilId === 'clay') {
      return {
        level: 'high',
        text: isAr ? 'خطر جريان وانجراف مرتفع (مرتفعات + تربة طينية)' : 'High runoff & crusting risk (highland clay)'
      };
    }
    if (elevationM >= 750 || soilId === 'clay') {
      return {
        level: 'medium',
        text: isAr ? 'خطر جريان متوسط — يُنصح بالحراثة الكنتورية' : 'Moderate runoff risk — contour/bunding advised'
      };
    }
    if (soilId === 'sandy') {
      return {
        level: 'medium',
        text: isAr ? 'تسرب عميق سريع — قسّم دفعات الري والسماد' : 'Rapid deep percolation — split irrigation pulses'
      };
    }
    if (soilId === 'saline') {
      return {
        level: 'medium',
        text: isAr ? 'تصريف بطيء واحتمال تملح سطحي بالحوض' : 'Basin drainage check needed to prevent salt rise'
      };
    }
    return {
      level: 'low',
      text: isAr ? 'تسلل مائي مستقر ومناسب للزراعة' : 'Low runoff risk · balanced soil infiltration'
    };
  }

  // ---------------------------------------------------------------------------
  // 5. AGRONOMIC SCORING, 3-STRATEGY ENGINE & STRESS-TEST EVALUATION
  // ---------------------------------------------------------------------------
  function getEffectiveRainfallMm(seasonClimate, soilId, rainShiftPct) {
    const captureBySoil = { loamy: 0.85, clay: 0.72, sandy: 0.65, saline: 0.68 };
    const capture = captureBySoil[soilId] || 0.75;
    const adjustedRain = seasonClimate.rain_mm * (1 + rainShiftPct / 100);
    return Math.max(0, Math.round(adjustedRain * capture));
  }

  function evaluateSeasonStress(crop, seasonName, climate, soilId, tempShiftC, rainShiftPct) {
    const sData = climate.seasonal[seasonName];
    const adjMax = Number((sData.tmax + tempShiftC).toFixed(1));
    const adjMin = Number((sData.tmin + tempShiftC * 0.85).toFixed(1));
    const adjMean = Number(((adjMax + adjMin) / 2).toFixed(1));
    const effRain = getEffectiveRainfallMm(sData, soilId, rainShiftPct);
    const deficitMm = Math.max(0, crop.water_mm - effRain);

    const heatExceeded = adjMax > crop.max_temp_c;
    const heatNearLimit = !heatExceeded && adjMax >= crop.max_temp_c - 2.0;
    const meanTooHot = adjMean > crop.opt_temp_c.max + 3.0;
    const coldStrain = adjMin < crop.opt_temp_c.min - 7.0;

    // Water threshold accounts for dryland supplemental efficiency & drought tolerance
    const severeDeficitLimit = crop.drought_tolerance >= 0.88 ? 310 : 265;
    const moderateDeficitLimit = crop.drought_tolerance >= 0.88 ? 245 : 205;
    const severeWaterStress = deficitMm > severeDeficitLimit && crop.drought_tolerance < 0.9;
    const moderateWaterStress = deficitMm > moderateDeficitLimit;

    const isAr = state.lang === 'ar';
    let status = 'pass';
    const reasons = [];

    if (heatExceeded) {
      status = 'fail';
      reasons.push(
        isAr
          ? `تتجاوز ذروة الحرارة (${adjMax}°م) حد التحمل الأقصى للمحصول (${crop.max_temp_c}°م) مما يسبب إجهاد الإزهار.`
          : `Peak temperature (${adjMax}°C) exceeds ${crop.name}'s ${crop.max_temp_c}°C heat-stress threshold.`
      );
    }
    if (severeWaterStress) {
      status = 'fail';
      reasons.push(
        isAr
          ? `عجز مائي حاد (${deficitMm} ملم) يفوق قدرة تحمّل المحصول للجفاف.`
          : `Severe water deficit (${deficitMm} mm beyond effective rainfall) exceeds dryland buffer.`
      );
    }
    if (status === 'pass' && (heatNearLimit || meanTooHot || moderateWaterStress || coldStrain)) {
      status = 'warn';
      if (heatNearLimit || meanTooHot) {
        reasons.push(
          isAr
            ? `الحرارة الموسمية (${adjMax}°م) تقترب من الحد الأقصى (${crop.max_temp_c}°م) وتتطلب رياً تكميلياً مبكراً.`
            : `Seasonal highs (${adjMax}°C) approach ${crop.max_temp_c}°C limit; shift sowing earlier.`
        );
      }
      if (moderateWaterStress) {
        reasons.push(
          isAr
            ? `فجوة رطوبة قدرها ${deficitMm} ملم تتطلب رياً بالتنقيط أو تغطية للتربة.`
            : `Moisture gap of ${deficitMm} mm requires supplemental drip irrigation or mulching.`
        );
      }
      if (coldStrain) {
        reasons.push(
          isAr
            ? `برودة الليل (${adjMin}°م) قد تبطئ الإنبات المبكر.`
            : `Cooler nights (${adjMin}°C) may slow early emergence.`
        );
      }
    }

    if (reasons.length === 0) {
      reasons.push(
        isAr
          ? `آمن مناخياً: ذروة ${adjMax}°م ضمن حد ${crop.max_temp_c}°م وفجوة مياه مُدارة (${deficitMm} ملم).`
          : `Resilient fit: ${adjMax}°C stays below ${crop.max_temp_c}°C threshold with manageable ${deficitMm} mm water gap.`
      );
    }

    return {
      status,
      adjMax,
      adjMin,
      adjMean,
      effRain,
      deficitMm,
      explanation: reasons.join(' ')
    };
  }

  function scoreCropForSeason(crop, seasonName, prevCropObj, climate, soilId, priority, mode) {
    const sData = climate.seasonal[seasonName];
    const meanTemp = (sData.tmax + sData.tmin) / 2;
    const soilFit = crop.soil_scores[soilId] || 0.7;

    // Thermal fit (0..1)
    let thermalScore = 1.0;
    if (sData.tmax > crop.max_temp_c) {
      thermalScore = Math.max(0.05, 0.35 - (sData.tmax - crop.max_temp_c) * 0.08);
    } else if (meanTemp < crop.opt_temp_c.min) {
      thermalScore = Math.max(0.25, 1 - (crop.opt_temp_c.min - meanTemp) * 0.08);
    } else if (meanTemp > crop.opt_temp_c.max) {
      thermalScore = Math.max(0.25, 1 - (meanTemp - crop.opt_temp_c.max) * 0.07);
    }

    const seasonMatchBonus = crop.preferred_seasons.includes(seasonName) ? 14 : -8;
    const waterScore = clamp(1 - (crop.water_mm - 200) / 240, 0.1, 1);
    const profitScore = clamp((crop.net_return_usd_ha - 750) / 1000, 0.1, 1);
    const soilHealthBonus =
      (crop.nitrogen_role === 'fixes' ? 0.55 : crop.nitrogen_role === 'neutral' ? 0.25 : 0.05) +
      (crop.root_depth === 'deep' ? 0.25 : 0.1) +
      (crop.functional_role === 'Cover / Anti-Erosion' ? 0.2 : 0);

    // Rotation rules
    let rotationScore = 0;
    if (prevCropObj) {
      if (crop.family === prevCropObj.family) {
        rotationScore -= 42; // Strong penalty against repeating same botanical family
      } else {
        rotationScore += 18;
      }
      if (prevCropObj.nitrogen_role === 'heavy_feeder' && crop.nitrogen_role === 'fixes') {
        rotationScore += 22; // Cereal -> Legume nitrogen cycling reward
      }
      if (prevCropObj.root_depth !== crop.root_depth) {
        rotationScore += 6;
      }
    }

    let priorityWeight = 0;
    if (mode === 'buffer') {
      priorityWeight = waterScore * 42 + crop.drought_tolerance * 28 + soilHealthBonus * 18;
      if (crop.water_mm > 300) priorityWeight -= 24;
    } else if (priority === 'water') {
      priorityWeight = waterScore * 38 + crop.drought_tolerance * 22 + profitScore * 12 + soilHealthBonus * 14;
    } else if (priority === 'profit') {
      priorityWeight = profitScore * 42 + waterScore * 16 + soilHealthBonus * 12;
    } else {
      priorityWeight = soilHealthBonus * 42 + waterScore * 18 + profitScore * 12;
    }

    return thermalScore * 34 + soilFit * 24 + seasonMatchBonus + rotationScore + priorityWeight;
  }

  function buildCropRationale(crop, prevCropObj, seasonName, climate, soilId, isStatusQuo) {
    const isAr = state.lang === 'ar';
    const soilLabel = getSoilLabel(soilId);
    const sData = climate.seasonal[seasonName];
    const effRain = getEffectiveRainfallMm(sData, soilId, 0);
    const deficit = Math.max(0, crop.water_mm - effRain);

    if (isStatusQuo) {
      return isAr
        ? `تكرار ${getCropName(crop)} (${crop.family}) يرفع مخاطر الآفات المنقولة بالتربة ويستنزف المغذيات مع فجوة مائية ${deficit} ملم.`
        : `Repeating ${crop.name} (${crop.family}) accumulates soil-borne pests, depletes root-zone nutrients, and leaves a ${deficit} mm irrigation gap.`;
    }

    const parts = [];
    if (prevCropObj && prevCropObj.family !== crop.family) {
      if (prevCropObj.nitrogen_role === 'heavy_feeder' && crop.nitrogen_role === 'fixes') {
        parts.push(
          isAr
            ? `يدور بعد ${getCropName(prevCropObj)} المجهد للتربة لتعويض النيتروجين طبيعياً.`
            : `Rotates after heavy-feeding ${prevCropObj.name} to replenish soil nitrogen naturally.`
        );
      } else {
        parts.push(
          isAr
            ? `تغيير العائلة النباتية عن ${getCropName(prevCropObj)} يكسر دورة الآفات والأمراض.`
            : `Breaks botanical family continuity after ${prevCropObj.name} to interrupt pest cycles.`
        );
      }
    }

    parts.push(
      isAr
        ? `يناسب التربة (${soilLabel}) بمعدل استهلاك ${crop.water_mm} ملم وحد تحمّل حراري ${crop.max_temp_c}°م.`
        : `Matches ${soilLabel.toLowerCase()} soil with ${crop.water_mm} mm seasonal demand and a ${crop.max_temp_c}°C heat cap.`
    );

    return parts.join(' ');
  }

  function determineRiskBenefitTag(crop, prevCropObj, seasonName, climate, isStatusQuo) {
    const sData = climate.seasonal[seasonName];
    if (isStatusQuo) {
      return { key: 'monoculture', tone: 'risk' };
    }
    if (sData.tmax >= crop.max_temp_c - 2.0) {
      return { key: 'heat_et', tone: 'warn' };
    }
    if (crop.functional_role === 'Cover / Anti-Erosion' || crop.root_depth === 'deep') {
      if (prevCropObj && prevCropObj.family !== crop.family && crop.nitrogen_role === 'fixes') {
        return { key: 'interrupts', tone: 'benefit' };
      }
      return { key: 'erosion', tone: 'benefit' };
    }
    return { key: 'interrupts', tone: 'benefit' };
  }

  function optimizeSequence(crops, seasons3, prevCropObj, climate, soilId, priority, mode, avoidSequenceIds) {
    let bestCombo = null;
    let bestTotal = -Infinity;

    for (let i = 0; i < crops.length; i++) {
      const c1 = crops[i];
      const s1 = scoreCropForSeason(c1, seasons3[0], prevCropObj, climate, soilId, priority, mode);
      if (s1 < 10) continue;

      for (let j = 0; j < crops.length; j++) {
        const c2 = crops[j];
        if (c2.id === c1.id) continue;
        const s2 = scoreCropForSeason(c2, seasons3[1], c1, climate, soilId, priority, mode);

        for (let k = 0; k < crops.length; k++) {
          const c3 = crops[k];
          if (c3.id === c2.id || c3.id === c1.id) continue;
          const s3 = scoreCropForSeason(c3, seasons3[2], c2, climate, soilId, priority, mode);

          let total = s1 + s2 + s3;
          // Reward 3 distinct botanical families across the 3 seasons
          const uniqueFamilies = new Set([c1.family, c2.family, c3.family]).size;
          total += uniqueFamilies * 12;

          // Ensure Strategy 3 (Dryland Buffer) differs meaningfully from Strategy 2 if possible
          if (avoidSequenceIds && avoidSequenceIds.join('|') === [c1.id, c2.id, c3.id].join('|')) {
            total -= 50;
          }

          if (total > bestTotal) {
            bestTotal = total;
            bestCombo = [c1, c2, c3];
          }
        }
      }
    }

    return bestCombo || [crops[0], crops[5], crops[10]];
  }

  function buildStrategyPackage(id, titleEn, titleAr, summaryEn, summaryAr, cropList, seasons3, prevCropObj, climate, soilId, isStatusQuo) {
    const items = cropList.map((crop, idx) => {
      const seasonName = seasons3[idx];
      const prevForStep = idx === 0 ? prevCropObj : cropList[idx - 1];
      const returnPenalty = isStatusQuo ? (idx === 0 ? 1.0 : idx === 1 ? 0.88 : 0.76) : 1.0;
      const soilFactor = 0.75 + (crop.soil_scores[soilId] || 0.75) * 0.25;
      const estReturn = Math.round(crop.net_return_usd_ha * soilFactor * returnPenalty);

      return {
        seasonIndex: idx + 1,
        seasonName,
        crop,
        estReturn,
        rationale: buildCropRationale(crop, prevForStep, seasonName, climate, soilId, isStatusQuo),
        functionalRole: crop.functional_role,
        fieldTag: determineRiskBenefitTag(crop, prevForStep, seasonName, climate, isStatusQuo)
      };
    });

    const totalWater = items.reduce((acc, item) => acc + item.crop.water_mm, 0);
    const totalReturn = items.reduce((acc, item) => acc + item.estReturn, 0);

    return {
      id,
      title_en: titleEn,
      title_ar: titleAr,
      summary_en: summaryEn,
      summary_ar: summaryAr,
      isStatusQuo,
      items,
      totalWater,
      totalReturn
    };
  }

  function computeAllStrategies() {
    const crops = state.crops.length ? state.crops : FALLBACK_CROPS;
    const prevCropObj = crops.find((c) => c.id === state.prevCrop) || crops[0];
    const seasons3 = getNextThreeSeasons(state.startSeason);
    const climate = state.climateData;

    // Strategy 1: Status Quo (repeats farmer's previous crop)
    const statusQuoCrops = [prevCropObj, prevCropObj, prevCropObj];
    const stratStatusQuo = buildStrategyPackage(
      'status_quo',
      'Strategy 1 · Status Quo',
      'الاستراتيجية 1 · الوضع القائم',
      'Repeats your previous crop across Seasons 1–3 to expose soil depletion, pest buildup, and thermal risk.',
      'تكرار المحصول السابق عبر 3 مواسم لكشف استنزاف التربة وتراكم الآفات والهشاشة المناخية.',
      statusQuoCrops,
      seasons3,
      prevCropObj,
      climate,
      state.soil,
      true
    );

    // Strategy 2: Primary Recommended Rotation (weighted by farmer priority)
    const recCrops = optimizeSequence(crops, seasons3, prevCropObj, climate, state.soil, state.priority, 'recommended', null);
    const stratRecommended = buildStrategyPackage(
      'recommended',
      'Strategy 2 · Primary Recommended',
      'الاستراتيجية 2 · التدوير الموصى به',
      'Diversified 3-season rotation weighted by your priority, breaking family repeats and cycling nitrogen.',
      'دورة متنوعة لـ 3 مواسم مرجحة بأولويتك تكسر تكرار العائلات النباتية وتعيد تدوير النيتروجين.',
      recCrops,
      seasons3,
      prevCropObj,
      climate,
      state.soil,
      false
    );

    // Strategy 3: Conservative Dryland Buffer
    const bufCrops = optimizeSequence(
      crops,
      seasons3,
      prevCropObj,
      climate,
      state.soil,
      'water',
      'buffer',
      recCrops.map((c) => c.id)
    );
    const stratBuffer = buildStrategyPackage(
      'buffer',
      'Strategy 3 · Dryland Buffer',
      'الاستراتيجية 3 · الحماية الجافة',
      'Ultra-low-water, soil-stabilizing dryland sequence built to withstand drought and wind erosion.',
      'تسلسل فائق التوفير للمياه ومثبت للتربة مصمم لمقاومة الجفاف وتعرية التربة.',
      bufCrops,
      seasons3,
      prevCropObj,
      climate,
      state.soil,
      false
    );

    state.strategies = [stratStatusQuo, stratRecommended, stratBuffer];
  }

  function evaluateStrategyForScenario(strategy, tempShiftC, rainShiftPct) {
    const climate = state.climateData;
    const evaluations = strategy.items.map((item) => {
      const ev = evaluateSeasonStress(item.crop, item.seasonName, climate, state.soil, tempShiftC, rainShiftPct);
      return {
        seasonIndex: item.seasonIndex,
        seasonName: item.seasonName,
        crop: item.crop,
        ...ev
      };
    });

    const passCount = evaluations.filter((e) => e.status === 'pass').length;
    const failCount = evaluations.filter((e) => e.status === 'fail').length;
    const warnCount = evaluations.filter((e) => e.status === 'warn').length;

    // Score out of 3 (warn counts as 0.5 resilience for smooth comparison, rounded display uses passCount or score)
    const numericScore = Number((passCount + warnCount * 0.5).toFixed(1));
    const displayPasses = failCount === 0 && warnCount <= 1 ? Math.max(2, passCount) : passCount;

    return {
      evaluations,
      passCount,
      warnCount,
      failCount,
      numericScore,
      displayPasses
    };
  }

  // ---------------------------------------------------------------------------
  // 6. LEAFLET MAPS (WIZARD & DASHBOARD SYNCHRONIZED)
  // ---------------------------------------------------------------------------
  function createPinIcon() {
    return L.divIcon({
      className: 'nawar-pin-wrapper',
      html: '<div class="nawar-map-pin"><div class="nawar-map-pin-core"></div></div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  }

  function createTileLayers() {
    return {
      street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18
      }),
      sat: L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri',
          maxZoom: 18
        }
      )
    };
  }

  function setMapLayerMode(mode) {
    state.mapLayerMode = mode;
    document.querySelectorAll('.map-layer-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.layer === mode);
    });

    [
      { map: state.wizMap, layers: state.wizLayers },
      { map: state.dashMap, layers: state.dashLayers }
    ].forEach((entry) => {
      if (!entry.map || !entry.layers) return;
      if (mode === 'sat') {
        if (entry.map.hasLayer(entry.layers.street)) entry.map.removeLayer(entry.layers.street);
        if (!entry.map.hasLayer(entry.layers.sat)) entry.layers.sat.addTo(entry.map);
      } else {
        if (entry.map.hasLayer(entry.layers.sat)) entry.map.removeLayer(entry.layers.sat);
        if (!entry.map.hasLayer(entry.layers.street)) entry.layers.street.addTo(entry.map);
      }
    });
  }

  function syncCoordinatesEverywhere(lat, lon, customLabelEn, customLabelAr, refreshDashboard) {
    state.lat = Number(lat.toFixed(4));
    state.lon = Number(lon.toFixed(4));

    if (customLabelEn) {
      state.locationName_en = customLabelEn;
      state.locationName_ar = customLabelAr || customLabelEn;
    } else {
      const coordStr = `${state.lat.toFixed(2)}°, ${state.lon.toFixed(2)}°`;
      state.locationName_en = `Custom Pin (${coordStr})`;
      state.locationName_ar = `موقع مخصص (${coordStr})`;
    }

    if ($('latInput')) $('latInput').value = state.lat;
    if ($('lonInput')) $('lonInput').value = state.lon;
    if ($('step2AreaName')) {
      $('step2AreaName').textContent = state.lang === 'ar' ? state.locationName_ar : state.locationName_en;
    }
    if ($('dashCoordReadout')) {
      $('dashCoordReadout').textContent = `${state.lat.toFixed(4)}°, ${state.lon.toFixed(4)}°`;
    }

    if (state.wizMarker && state.wizMap) {
      state.wizMarker.setLatLng([state.lat, state.lon]);
      state.wizMap.panTo([state.lat, state.lon]);
    }
    if (state.dashMarker && state.dashMap) {
      state.dashMarker.setLatLng([state.lat, state.lon]);
      state.dashMap.panTo([state.lat, state.lon]);
    }

    if (refreshDashboard && state.stage === 'dashboard') {
      runLiveDashboardRefresh();
    }
  }

  function ensureWizardMap() {
    if (typeof L === 'undefined') return;
    if (!state.wizMap) {
      const layers = createTileLayers();
      const map = L.map('farmMap', { zoomControl: true }).setView([state.lat, state.lon], 10);
      layers[state.mapLayerMode].addTo(map);
      const marker = L.marker([state.lat, state.lon], { draggable: true, icon: createPinIcon() }).addTo(map);

      map.on('click', (e) => {
        state.selectedPresetId = null;
        highlightPresetButtons();
        syncCoordinatesEverywhere(e.latlng.lat, e.latlng.lng, null, null, false);
      });

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        state.selectedPresetId = null;
        highlightPresetButtons();
        syncCoordinatesEverywhere(pos.lat, pos.lng, null, null, false);
      });

      state.wizMap = map;
      state.wizMarker = marker;
      state.wizLayers = layers;
    } else {
      state.wizMarker.setLatLng([state.lat, state.lon]);
      state.wizMap.setView([state.lat, state.lon], 10);
    }
    setTimeout(() => state.wizMap && state.wizMap.invalidateSize(), 120);
  }

  function ensureDashboardMap() {
    if (typeof L === 'undefined') return;
    if (!state.dashMap) {
      const layers = createTileLayers();
      const map = L.map('dashFarmMap', { zoomControl: true }).setView([state.lat, state.lon], 9);
      layers[state.mapLayerMode].addTo(map);
      const marker = L.marker([state.lat, state.lon], { draggable: true, icon: createPinIcon() }).addTo(map);

      map.on('click', (e) => {
        state.selectedPresetId = null;
        highlightPresetButtons();
        syncCoordinatesEverywhere(e.latlng.lat, e.latlng.lng, null, null, true);
      });

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        state.selectedPresetId = null;
        highlightPresetButtons();
        syncCoordinatesEverywhere(pos.lat, pos.lng, null, null, true);
      });

      state.dashMap = map;
      state.dashMarker = marker;
      state.dashLayers = layers;
    } else {
      state.dashMarker.setLatLng([state.lat, state.lon]);
      state.dashMap.setView([state.lat, state.lon], 9);
    }
    setTimeout(() => state.dashMap && state.dashMap.invalidateSize(), 120);
  }

  // ---------------------------------------------------------------------------
  // 7. DEMO PRESETS & SAVED PLOTS
  // ---------------------------------------------------------------------------
  function highlightPresetButtons() {
    document.querySelectorAll('.demo-preset-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.presetId === state.selectedPresetId);
    });
  }

  function applyDemoPreset(presetId, launchImmediately) {
    const preset = DEMO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    state.selectedPresetId = preset.id;
    state.soil = preset.soil;
    state.prevCrop = preset.prevCrop;
    state.startSeason = preset.startSeason;
    state.priority = preset.priority;
    state.gardenName = state.lang === 'ar' ? preset.name_ar : preset.name_en;
    state.activePlotId = null;

    syncCoordinatesEverywhere(preset.lat, preset.lon, preset.name_en, preset.name_ar, false);
    highlightPresetButtons();
    syncFormControlsWithState();

    if (launchImmediately) {
      executePlanGeneration();
    } else if (state.stage === 'wizard' && state.wizStep === 1) {
      goToWizardStep(2);
    }
  }

  function renderPresetContainers() {
    const targets = ['welcomeDemoPresets', 'wizardDemoPresets', 'wizMapDemoPresets', 'dashDemoPresets'];
    targets.forEach((containerId) => {
      const el = $(containerId);
      if (!el) return;
      el.innerHTML = '';
      DEMO_PRESETS.forEach((preset) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'demo-preset-btn' + (state.selectedPresetId === preset.id ? ' active' : '');
        btn.dataset.presetId = preset.id;
        btn.textContent = state.lang === 'ar' ? preset.name_ar : preset.name_en;
        btn.addEventListener('click', () => {
          const launchNow = containerId === 'welcomeDemoPresets' || containerId === 'dashDemoPresets';
          applyDemoPreset(preset.id, launchNow);
        });
        el.appendChild(btn);
      });
    });
  }

  function loadSavedPlots() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      state.savedPlots = raw ? JSON.parse(raw) : [];
    } catch (_e) {
      state.savedPlots = [];
    }
  }

  function saveCurrentPlotToStorage() {
    const rec = state.strategies.find((s) => s.id === 'recommended') || state.strategies[0];
    const chain = rec ? rec.items.map((it) => getCropName(it.crop)).join(' → ') : '';
    const title = state.gardenName.trim() || (state.lang === 'ar' ? state.locationName_ar : state.locationName_en);
    const id = state.activePlotId || 'plot_' + Date.now();
    state.activePlotId = id;

    const record = {
      id,
      name: title,
      locationName_en: state.locationName_en,
      locationName_ar: state.locationName_ar,
      lat: state.lat,
      lon: state.lon,
      soil: state.soil,
      prevCrop: state.prevCrop,
      startSeason: state.startSeason,
      priority: state.priority,
      chainPreview: chain
    };

    const idx = state.savedPlots.findIndex((p) => p.id === id);
    if (idx >= 0) {
      state.savedPlots[idx] = record;
    } else {
      state.savedPlots.unshift(record);
    }
    state.savedPlots = state.savedPlots.slice(0, 8);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedPlots));
    } catch (_e) {
      // Ignore storage quota errors
    }

    renderSavedPlotsWelcome();
    renderGardenSwitcher();
  }

  function renderSavedPlotsWelcome() {
    const section = $('savedGardensSection');
    const grid = $('savedGardensGrid');
    if (!section || !grid) return;

    if (!state.savedPlots.length) {
      section.classList.add('hidden-block');
      return;
    }

    section.classList.remove('hidden-block');
    grid.innerHTML = '';

    state.savedPlots.forEach((plot) => {
      const card = document.createElement('div');
      card.className = 'saved-garden-card';

      const info = document.createElement('div');
      const nameEl = document.createElement('div');
      nameEl.className = 'saved-garden-name';
      nameEl.textContent = plot.name;

      const locEl = document.createElement('div');
      locEl.className = 'saved-garden-loc';
      locEl.textContent = `${state.lang === 'ar' ? plot.locationName_ar : plot.locationName_en} · ${getSoilLabel(plot.soil)}`;

      const chainEl = document.createElement('div');
      chainEl.className = 'saved-garden-chain';
      chainEl.textContent = plot.chainPreview || '';

      info.appendChild(nameEl);
      info.appendChild(locEl);
      info.appendChild(chainEl);

      const actions = document.createElement('div');
      actions.className = 'saved-garden-actions';

      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'primary-cta-btn';
      openBtn.textContent = state.lang === 'ar' ? 'فتح الخطة' : 'Open Plan';
      openBtn.addEventListener('click', () => {
        loadPlotIntoState(plot);
        executePlanGeneration();
      });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'secondary-btn';
      delBtn.textContent = state.lang === 'ar' ? 'حذف' : 'Delete';
      delBtn.addEventListener('click', () => {
        state.savedPlots = state.savedPlots.filter((p) => p.id !== plot.id);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedPlots));
        } catch (_e) {
          // ignore
        }
        renderSavedPlotsWelcome();
      });

      actions.appendChild(openBtn);
      actions.appendChild(delBtn);

      card.appendChild(info);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  function loadPlotIntoState(plot) {
    state.activePlotId = plot.id;
    state.gardenName = plot.name;
    state.soil = plot.soil;
    state.prevCrop = plot.prevCrop;
    state.startSeason = plot.startSeason;
    state.priority = plot.priority;
    state.selectedPresetId = null;
    syncCoordinatesEverywhere(plot.lat, plot.lon, plot.locationName_en, plot.locationName_ar, false);
    syncFormControlsWithState();
  }

  function renderGardenSwitcher() {
    const wrap = $('gardenSwitcherWrap');
    const select = $('gardenSelect');
    if (!wrap || !select) return;

    if (state.savedPlots.length < 2) {
      wrap.classList.add('hidden-block');
      return;
    }

    wrap.classList.remove('hidden-block');
    select.innerHTML = '';
    state.savedPlots.forEach((plot) => {
      const opt = document.createElement('option');
      opt.value = plot.id;
      opt.textContent = plot.name;
      if (plot.id === state.activePlotId) opt.selected = true;
      select.appendChild(opt);
    });
  }

  // ---------------------------------------------------------------------------
  // 8. STAGE & WIZARD NAVIGATION
  // ---------------------------------------------------------------------------
  function setStage(stageName) {
    state.stage = stageName;
    ['welcomeStage', 'wizardStage', 'dashboardStage'].forEach((id) => {
      const el = $(id);
      if (!el) return;
      const match =
        (id === 'welcomeStage' && stageName === 'welcome') ||
        (id === 'wizardStage' && stageName === 'wizard') ||
        (id === 'dashboardStage' && stageName === 'dashboard');
      el.classList.toggle('active-stage', match);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (stageName === 'wizard' && state.wizStep === 2) {
      ensureWizardMap();
    }
    if (stageName === 'dashboard') {
      ensureDashboardMap();
    }
  }

  function goToWizardStep(stepNum) {
    state.wizStep = stepNum;
    for (let i = 1; i <= 4; i++) {
      const stepEl = $('wizStep' + i);
      if (stepEl) stepEl.classList.toggle('active-wiz-step', i === stepNum);

      const tabEl = document.querySelector(`.wiz-prog-item[data-wiz-step="${i}"]`);
      if (tabEl) {
        tabEl.classList.toggle('active', i === stepNum);
        tabEl.classList.toggle('done', i < stepNum);
        if (i <= stepNum) tabEl.disabled = false;
      }
    }

    if (stepNum === 2) {
      ensureWizardMap();
      if ($('step2AreaName')) {
        $('step2AreaName').textContent = state.lang === 'ar' ? state.locationName_ar : state.locationName_en;
      }
    }
    if (stepNum === 4) {
      renderWizardSummary();
    }
  }

  function renderCountriesAndRegions() {
    const grid = $('countryCardsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    COUNTRY_CATALOG.forEach((country) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'country-card-btn' + (state.selectedCountryId === country.id ? ' selected' : '');
      btn.textContent = state.lang === 'ar' ? country.name_ar : country.name_en;
      btn.addEventListener('click', () => {
        state.selectedCountryId = country.id;
        renderCountriesAndRegions();
        renderRegionsForCountry(country);
      });
      grid.appendChild(btn);
    });
  }

  function renderRegionsForCountry(country, filterQuery) {
    const panel = $('regionPickerPanel');
    const badge = $('selectedCountryBadge');
    const grid = $('regionCardsGrid');
    const status = $('citySearchStatus');
    if (!panel || !grid) return;

    panel.classList.remove('hidden-block');
    if (badge) badge.textContent = state.lang === 'ar' ? country.name_ar : country.name_en;

    const q = (filterQuery || '').trim().toLowerCase();
    const list = country.regions.filter((r) => {
      if (!q) return true;
      return r.name_en.toLowerCase().includes(q) || r.name_ar.toLowerCase().includes(q);
    });

    if (status) {
      if (q && !list.length) {
        status.classList.remove('hidden-block');
        status.textContent =
          state.lang === 'ar'
            ? 'لم يتم العثور على المدينة في القائمة السريعة — يمكنك تثبيت موقعك مباشرة على الخريطة أدناه.'
            : 'No preset matched your filter — click below to pin any custom coordinates on the map.';
      } else {
        status.classList.add('hidden-block');
      }
    }

    grid.innerHTML = '';
    list.forEach((reg) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'region-card-btn';
      btn.innerHTML = `<span>${state.lang === 'ar' ? reg.name_ar : reg.name_en}</span><span class="tabular-nums" style="font-size:0.75rem;color:var(--text-muted)">${reg.lat.toFixed(2)}°, ${reg.lon.toFixed(2)}°</span>`;
      btn.addEventListener('click', () => {
        state.soil = reg.soil;
        state.selectedPresetId = null;
        highlightPresetButtons();
        syncCoordinatesEverywhere(reg.lat, reg.lon, reg.name_en, reg.name_ar, false);
        syncFormControlsWithState();
        goToWizardStep(2);
      });
      grid.appendChild(btn);
    });
  }

  function renderSoilCards() {
    const grid = $('soilCardsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    SOIL_TYPES.forEach((soil) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'soil-card-btn' + (state.soil === soil.id ? ' selected' : '');
      btn.innerHTML = `
        <div class="soil-card-top">
          <span class="soil-card-title">${state.lang === 'ar' ? soil.name_ar : soil.name_en}</span>
        </div>
        <span class="soil-card-desc">${state.lang === 'ar' ? soil.desc_ar : soil.desc_en}</span>
      `;
      btn.addEventListener('click', () => {
        state.soil = soil.id;
        renderSoilCards();
        syncFormControlsWithState();
      });
      grid.appendChild(btn);
    });
  }

  function populateDynamicDropdowns() {
    const crops = state.crops.length ? state.crops : FALLBACK_CROPS;
    ['prevCropSelect', 'dashPrevCropSelect'].forEach((id) => {
      const sel = $(id);
      if (!sel) return;
      sel.innerHTML = '';
      crops.forEach((crop) => {
        const opt = document.createElement('option');
        opt.value = crop.id;
        opt.textContent = `${getCropName(crop)} (${crop.family})`;
        if (crop.id === state.prevCrop) opt.selected = true;
        sel.appendChild(opt);
      });
    });

    ['seasonSelect', 'dashSeasonSelect'].forEach((id) => {
      const sel = $(id);
      if (!sel) return;
      sel.innerHTML = '';
      SEASONS_ORDER.forEach((s) => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = getSeasonLabel(s);
        if (s === state.startSeason) opt.selected = true;
        sel.appendChild(opt);
      });
    });

    if ($('dashSoilSelect')) {
      const soilSel = $('dashSoilSelect');
      Array.from(soilSel.options).forEach((opt) => {
        opt.textContent = getSoilLabel(opt.value);
      });
      soilSel.value = state.soil;
    }

    if ($('dashPrioritySelect')) {
      const prioSel = $('dashPrioritySelect');
      Array.from(prioSel.options).forEach((opt) => {
        opt.textContent = getPriorityLabel(opt.value);
      });
      prioSel.value = state.priority;
    }
  }

  function syncFormControlsWithState() {
    renderSoilCards();
    populateDynamicDropdowns();

    document.querySelectorAll('.priority-btn').forEach((btn) => {
      const active = btn.dataset.priority === state.priority;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if ($('gardenNameInput')) $('gardenNameInput').value = state.gardenName;
    if ($('latInput')) $('latInput').value = state.lat;
    if ($('lonInput')) $('lonInput').value = state.lon;
  }

  function renderWizardSummary() {
    const grid = $('wizardSummaryGrid');
    if (!grid) return;
    const crops = state.crops.length ? state.crops : FALLBACK_CROPS;
    const prev = crops.find((c) => c.id === state.prevCrop) || crops[0];
    const items = [
      { label: state.lang === 'ar' ? 'الموقع' : 'Location', val: state.lang === 'ar' ? state.locationName_ar : state.locationName_en },
      { label: state.lang === 'ar' ? 'الإحداثيات' : 'Coordinates', val: `${state.lat.toFixed(2)}°, ${state.lon.toFixed(2)}°` },
      { label: t('soilTypeShort'), val: getSoilLabel(state.soil) },
      { label: state.lang === 'ar' ? 'المحصول السابق' : 'Previous Crop', val: getCropName(prev) },
      { label: t('startSeasonShort'), val: getSeasonLabel(state.startSeason) },
      { label: t('priorityShort'), val: getPriorityLabel(state.priority) }
    ];

    grid.innerHTML = items
      .map(
        (it) => `<div class="sum-item"><div class="sum-label">${it.label}</div><div class="sum-val">${it.val}</div></div>`
      )
      .join('');
  }

  // ---------------------------------------------------------------------------
  // 9. DASHBOARD RENDERERS (NASA BAR, STRATEGIES, SEASON CARDS, CHARTS, GLOSSARY)
  // ---------------------------------------------------------------------------
  function renderNasaTelemetryBar() {
    const c = state.climateData;
    if (!c) return;

    const badge = $('nasaSourceBadge');
    if (badge) {
      if (c.nasaLive) {
        badge.className = 'status-badge status-live';
        badge.textContent = t('nasaSourceLive');
      } else {
        badge.className = 'status-badge status-cached';
        badge.textContent = t('nasaSourceFallback');
      }
    }

    const startSeasonClimate = c.seasonal[state.startSeason] || c.seasonal.Winter;
    $('valMaxTemp').textContent = `${c.peakMaxC}°C`;
    $('subMaxTemp').textContent =
      state.lang === 'ar'
        ? `المتوسط السنوي ${c.meanMaxC}°م · ${getSeasonLabel(state.startSeason)} ${startSeasonClimate.tmax}°م`
        : `Annual mean ${c.meanMaxC}°C · ${state.startSeason} ${startSeasonClimate.tmax}°C`;

    $('valMinTemp').textContent = `${c.coolestMinC}°C`;
    $('subMinTemp').textContent =
      state.lang === 'ar'
        ? `المتوسط السنوي ${c.meanMinC}°م · ${getSeasonLabel(state.startSeason)} ${startSeasonClimate.tmin}°م`
        : `Annual mean ${c.meanMinC}°C · ${state.startSeason} ${startSeasonClimate.tmin}°C`;

    $('valRain').textContent = `${c.annualRainMm} mm`;
    $('subRain').textContent =
      state.lang === 'ar'
        ? `${getSeasonLabel(state.startSeason)}: ${startSeasonClimate.rain_mm} ملم`
        : `${state.startSeason}: ${startSeasonClimate.rain_mm} mm seasonal`;

    $('valSolar').textContent = `${c.annualSolar} kWh/m²`;
    $('subSolar').textContent =
      state.lang === 'ar'
        ? `متوسط يومي (${getSeasonLabel(state.startSeason)}: ${startSeasonClimate.solar})`
        : `Daily avg (${state.startSeason}: ${startSeasonClimate.solar})`;

    const runoff = assessRunoffRisk(c.elevationM, state.soil);
    $('valElev').textContent = `${c.elevationM} m`;
    $('subElev').textContent = runoff.text;
  }

  function renderFarmContextBar() {
    const crops = state.crops.length ? state.crops : FALLBACK_CROPS;
    const prev = crops.find((c) => c.id === state.prevCrop) || crops[0];
    const locTitle = state.lang === 'ar' ? state.locationName_ar : state.locationName_en;
    const plotTitle = state.gardenName.trim();

    $('activeLocationLabel').textContent = plotTitle && plotTitle !== locTitle ? `${plotTitle} — ${locTitle}` : locTitle;
    $('activeFarmMetaLine').textContent = [
      `${t('soilTypeShort')}: ${getSoilLabel(state.soil)}`,
      `${state.lang === 'ar' ? 'السابق' : 'Previous'}: ${getCropName(prev)}`,
      `${t('startSeasonShort')}: ${getSeasonLabel(state.startSeason)}`,
      `${t('priorityShort')}: ${getPriorityLabel(state.priority)}`
    ].join(' · ');

    if ($('dashCoordReadout')) {
      $('dashCoordReadout').textContent = `${state.lat.toFixed(4)}°, ${state.lon.toFixed(4)}°`;
    }
  }

  function renderStrategyCards() {
    const container = $('strategyCardsContainer');
    if (!container) return;
    container.innerHTML = '';

    state.strategies.forEach((strat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'strategy-card' + (strat.id === state.activeStrategyId ? ' active' : '');

      const chain = strat.items.map((it) => getCropName(it.crop)).join(' → ');
      const title = state.lang === 'ar' ? strat.title_ar : strat.title_en;
      const summary = state.lang === 'ar' ? strat.summary_ar : strat.summary_en;
      const tagLabel = strat.isStatusQuo
        ? state.lang === 'ar'
          ? 'خط أساسي للمقارنة'
          : 'Baseline Risk'
        : strat.id === 'recommended'
          ? state.lang === 'ar'
            ? 'الأنسب لأولويتك'
            : 'Priority Optimal'
          : state.lang === 'ar'
            ? 'منخفض المياه'
            : 'Drought Buffer';

      btn.innerHTML = `
        <div>
          <div class="strategy-card-top">
            <span class="strategy-card-title">${title}</span>
            <span class="strategy-tag ${strat.isStatusQuo ? 'tag-warn' : ''}">${tagLabel}</span>
          </div>
          <div class="strategy-crop-chain" style="margin-top:6px;">${chain}</div>
          <p class="strategy-summary-note" style="margin-top:6px;">${summary}</p>
        </div>
        <div class="strategy-card-metrics tabular-nums">
          <span>${state.lang === 'ar' ? 'المياه:' : 'Water:'} ${strat.totalWater} mm</span>
          <span>${state.lang === 'ar' ? 'العائد:' : 'Return:'} $${strat.totalReturn.toLocaleString()}/ha</span>
        </div>
      `;

      btn.addEventListener('click', () => {
        state.activeStrategyId = strat.id;
        renderStrategyCards();
        renderActiveStrategyDetails();
      });

      container.appendChild(btn);
    });
  }

  function renderActiveStrategyDetails() {
    const strat = state.strategies.find((s) => s.id === state.activeStrategyId) || state.strategies[1];
    if (!strat) return;

    $('activeStrategyLabel').textContent = state.lang === 'ar' ? strat.title_ar : strat.title_en;
    const stressEval = evaluateStrategyForScenario(strat, state.tempShift, state.rainShift);

    // 1. Season Cards
    const cardsGrid = $('seasonCardsGrid');
    cardsGrid.innerHTML = '';

    strat.items.forEach((item, idx) => {
      const ev = stressEval.evaluations[idx];
      const roleLabel = I18N[state.lang].roles[item.functionalRole] || item.functionalRole;
      const benefitLabel = I18N[state.lang].benefits[item.fieldTag.key] || item.fieldTag.key;
      const tagClass =
        item.fieldTag.tone === 'risk'
          ? 'badge-risk'
          : item.fieldTag.tone === 'warn'
            ? 'badge-warn'
            : 'badge-benefit';

      const card = document.createElement('div');
      card.className = 'season-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      const statusBadgeClass =
        ev.status === 'pass' ? 'risk-low' : ev.status === 'warn' ? 'risk-medium' : 'risk-high';
      const statusText =
        ev.status === 'pass'
          ? state.lang === 'ar'
            ? 'مرن'
            : 'Resilient'
          : ev.status === 'warn'
            ? state.lang === 'ar'
              ? 'إجهاد متوسط'
              : 'Moderate Strain'
            : state.lang === 'ar'
              ? 'خطر فشل'
              : 'High Stress';

      card.innerHTML = `
        <div>
          <div class="season-card-head">
            <div>
              <div class="season-card-kicker">${t('seasonWord')} ${item.seasonIndex} · ${getSeasonLabel(item.seasonName)}</div>
              <div class="season-card-crop">${getCropName(item.crop)}</div>
              <div class="season-card-family">${item.crop.family} · ${state.lang === 'ar' ? 'جذور' : 'Roots'}: ${item.crop.root_depth}</div>
            </div>
            <span class="risk-badge ${statusBadgeClass}">${statusText}</span>
          </div>

          <div class="season-card-metrics tabular-nums" style="margin-top:12px;">
            <div>
              <div class="sc-metric-label">${state.lang === 'ar' ? 'الاحتياج المائي' : 'Water Req.'}</div>
              <div class="sc-metric-val">${item.crop.water_mm} mm</div>
            </div>
            <div>
              <div class="sc-metric-label">${state.lang === 'ar' ? 'صافي العائد' : 'Est. Net Return'}</div>
              <div class="sc-metric-val">$${item.estReturn.toLocaleString()}/ha</div>
            </div>
          </div>

          <p class="season-card-reason" style="margin-top:10px;">${item.rationale}</p>
        </div>

        <div class="season-badges-row">
          <span class="agri-badge badge-role">${roleLabel}</span>
          <span class="agri-badge ${tagClass}">${benefitLabel}</span>
        </div>
      `;

      const openModal = () => openCropDetailModal(item, ev);
      card.addEventListener('click', openModal);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal();
        }
      });

      cardsGrid.appendChild(card);
    });

    // 2. Plan Table
    const tbody = $('planTableBody');
    tbody.innerHTML = '';
    strat.items.forEach((item, idx) => {
      const ev = stressEval.evaluations[idx];
      const statusBadgeClass =
        ev.status === 'pass' ? 'risk-low' : ev.status === 'warn' ? 'risk-medium' : 'risk-high';
      const statusText =
        ev.status === 'pass'
          ? state.lang === 'ar'
            ? 'مرن'
            : 'Pass'
          : ev.status === 'warn'
            ? state.lang === 'ar'
              ? 'تنبيه'
              : 'Strain'
            : state.lang === 'ar'
              ? 'إجهاد حاد'
              : 'Fail';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td data-label="${t('colSeason')}">
          <div class="cell-season-num">${t('seasonWord')} ${item.seasonIndex}</div>
          <div class="cell-season-sub">${getSeasonLabel(item.seasonName)}</div>
        </td>
        <td data-label="${t('colCrop')}">
          <div class="cell-crop-name">${getCropName(item.crop)}</div>
          <div class="cell-crop-family">${item.crop.family}</div>
        </td>
        <td data-label="${t('colReason')}">
          <div>${item.rationale}</div>
        </td>
        <td data-label="${t('colWater')}" class="tabular-nums">
          <strong>${item.crop.water_mm} mm</strong>
          <div class="cell-season-sub">${state.lang === 'ar' ? 'مطر فعال:' : 'Eff. rain:'} ${ev.effRain} mm (${state.lang === 'ar' ? 'عجز' : 'gap'} ${ev.deficitMm} mm)</div>
        </td>
        <td data-label="${t('colRisk')}">
          <span class="risk-badge ${statusBadgeClass}">${statusText}</span>
        </td>
        <td data-label="${t('colReturn')}" class="tabular-nums">
          <strong>$${item.estReturn.toLocaleString()}/ha</strong>
        </td>
      `;
      tr.addEventListener('click', () => openCropDetailModal(item, ev));
      tbody.appendChild(tr);
    });

    // 3. Climate Stress Confidence & Season Diagnostics
    renderClimateStressPanel(strat, stressEval);

    // 4. Charts
    renderCharts(strat, stressEval);
  }

  function renderClimateStressPanel(strat, stressEval) {
    const passCount = stressEval.passCount;
    const banner = $('confidenceBadge');

    let confClass = 'conf-low';
    let confLabel = '';
    if (passCount === 3) {
      confClass = 'conf-high';
      confLabel = state.lang === 'ar' ? '3/3 مرونة مناخية عالية' : '3/3 High Resilience';
    } else if (passCount === 2) {
      confClass = 'conf-medium';
      confLabel = state.lang === 'ar' ? '2/3 مرونة متوسطة' : '2/3 Moderate Resilience';
    } else {
      confClass = 'conf-low';
      confLabel =
        passCount === 1
          ? state.lang === 'ar'
            ? '1/3 خطر مناخي مرتفع'
            : '1/3 High Risk'
          : state.lang === 'ar'
            ? '0/3 خطر حرج'
            : '0/3 High Risk';
    }

    const pct = Math.round((passCount / 3) * 100);
    const barColor =
      passCount === 3 ? 'var(--brand-green)' : passCount === 2 ? 'var(--brand-amber)' : 'var(--brand-terracotta)';

    banner.className = `confidence-banner ${confClass}`;
    banner.innerHTML = `
      <div class="conf-score tabular-nums">${passCount}/3</div>
      <div class="conf-details">
        <div class="conf-title">${confLabel} · ${state.lang === 'ar' ? strat.title_ar : strat.title_en} (${state.tempShift >= 0 ? '+' : ''}${state.tempShift.toFixed(1)}°C, ${state.rainShift > 0 ? '+' : ''}${state.rainShift}%)</div>
        <div class="conf-bar-track">
          <div class="conf-bar-fill" style="width: ${pct}%; background: ${barColor};"></div>
        </div>
      </div>
    `;

    const grid = $('scenarioCardsGrid');
    grid.innerHTML = '';
    stressEval.evaluations.forEach((ev) => {
      const card = document.createElement('div');
      card.className = 'scenario-card';
      const statusCls = ev.status === 'pass' ? 'scen-pass' : ev.status === 'warn' ? 'scen-warn' : 'scen-fail';
      const statusTxt =
        ev.status === 'pass'
          ? state.lang === 'ar'
            ? 'ناجح'
            : 'Pass'
          : ev.status === 'warn'
            ? state.lang === 'ar'
              ? 'إجهاد'
              : 'Strain'
            : state.lang === 'ar'
              ? 'فشل'
              : 'Fail';

      card.innerHTML = `
        <div class="scenario-card-header">
          <span class="scenario-name">${t('seasonWord')} ${ev.seasonIndex}: ${getCropName(ev.crop)} (${getSeasonLabel(ev.seasonName)})</span>
          <span class="scenario-status ${statusCls}">${statusTxt}</span>
        </div>
        <p class="scenario-desc">${ev.explanation}</p>
      `;
      grid.appendChild(card);
    });
  }

  function renderCharts(strat, stressEval) {
    if (typeof Chart === 'undefined') return;

    const seasonLabels = strat.items.map(
      (it) => `${t('seasonWord')} ${it.seasonIndex}: ${getCropName(it.crop)}`
    );
    const demandData = strat.items.map((it) => it.crop.water_mm);
    const rainData = stressEval.evaluations.map((ev) => ev.effRain);

    const ctx1 = $('waterBalanceChart').getContext('2d');
    if (state.waterChart) state.waterChart.destroy();
    state.waterChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: seasonLabels,
        datasets: [
          {
            label: state.lang === 'ar' ? 'احتياج المحصول (ملم)' : 'Crop Water Demand (mm)',
            data: demandData,
            backgroundColor: '#c57b27',
            borderRadius: 4
          },
          {
            label: state.lang === 'ar' ? 'المطر الفعال (ملم)' : 'Effective Rainfall (mm)',
            data: rainData,
            backgroundColor: '#3a7ca5',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'mm' }
          }
        }
      }
    });

    // Chart 2: Baseline vs +2°C vs -20% Rainfall across the 3 strategies
    const stratNames = state.strategies.map((s) =>
      s.id === 'status_quo'
        ? state.lang === 'ar'
          ? 'الوضع القائم'
          : 'Status Quo'
        : s.id === 'recommended'
          ? state.lang === 'ar'
            ? 'الموصى بها'
            : 'Primary Rec.'
          : state.lang === 'ar'
            ? 'الحماية الجافة'
            : 'Dryland Buffer'
    );

    const baselineScores = state.strategies.map((s) => evaluateStrategyForScenario(s, 0, 0).numericScore);
    const warmScores = state.strategies.map((s) => evaluateStrategyForScenario(s, 2, 0).numericScore);
    const dryScores = state.strategies.map((s) => evaluateStrategyForScenario(s, 0, -20).numericScore);

    const ctx2 = $('strategyScenarioChart').getContext('2d');
    if (state.scenarioChart) state.scenarioChart.destroy();
    state.scenarioChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: stratNames,
        datasets: [
          {
            label: t('presetBaseline'),
            data: baselineScores,
            backgroundColor: '#1f5c3a',
            borderRadius: 4
          },
          {
            label: t('presetWarm2'),
            data: warmScores,
            backgroundColor: '#c57b27',
            borderRadius: 4
          },
          {
            label: t('presetDry20'),
            data: dryScores,
            backgroundColor: '#b84a39',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 3,
            ticks: { stepSize: 1 },
            title: {
              display: true,
              text: state.lang === 'ar' ? 'المواسم الناجحة (من 3)' : 'Resilient Seasons (/3)'
            }
          }
        }
      }
    });
  }

  function renderLocalGapsAndGlossary() {
    const gapsList = $('localGapsList');
    if (gapsList) {
      const items =
        state.lang === 'ar'
          ? [
              { title: 'ملوحة مياه الآبار (EC)', desc: 'لا تقيس الأقمار الصناعية ملوحة مياه الري الجوفية؛ اختبر العكارة والملوحة قبل زراعة البقوليات الحساسة.' },
              { title: 'توفر البذور المحلية المعتمدة', desc: 'تأكد من توفر أصناف قصيرة العمر محلياً تتناسب مع نافذة الموسم المقترحة.' },
              { title: 'الطلب السوقي وأسعار المزرعة', desc: 'قارن العائد التقديري بأسعار الجملة المحلية وتكاليف النقل والتبريد.' },
              { title: 'انضغاط التربة والطبقات الصماء', desc: 'افحص عمق التربة الجذرية ميدانياً للتأكد من عدم وجود طبقة كلسية تمنع الجذور العميقة.' }
            ]
          : [
              { title: 'Well Water Salinity (EC)', desc: 'Satellites cannot measure groundwater salinity; test irrigation water EC before planting salt-sensitive legumes.' },
              { title: 'Local Seed Availability', desc: 'Verify regional availability of short-duration drought-adapted seed varieties for the recommended sowing window.' },
              { title: 'Local Market Demand & Farmgate Prices', desc: 'Cross-check estimated $/ha returns against local wholesale demand, storage, and transport costs.' },
              { title: 'Subsoil Compaction & Hardpan', desc: 'Inspect root-zone depth on the ground to confirm no caliche or plow-pan restricts deep-rooting crops.' }
            ];

      gapsList.innerHTML = items
        .map(
          (it) =>
            `<li class="local-gap-item"><div class="local-gap-title">${it.title}</div><div class="local-gap-desc">${it.desc}</div></li>`
        )
        .join('');
    }

    const glossaryGrid = $('glossaryGrid');
    if (glossaryGrid) {
      const terms =
        state.lang === 'ar'
          ? [
              { term: 'البخر-نتح (Evapotranspiration - ET)', def: 'مجموع الماء المفقود من سطح التربة بالتبخر ومن أوراق النبات بالنتح؛ يزداد بسرعة مع ارتفاع الحرارة والرياح.' },
              { term: 'الميزان المائي (Water Balance)', def: 'الفرق بين المطر الفعال الذي تحتفظ به التربة والاحتياج المائي للمحصول، ويحدد كمية الري التكميلي المطلوبة.' },
              { term: 'عتبة الإجهاد الحراري (Heat-Stress Threshold)', def: 'درجة الحرارة القصوى التي يتراجع عندها عقد الأزهار وتلقيح الحبوب بشكل حاد إذا تجاوزتها حرارة الموسم.' },
              { term: 'تدوير العائلات النباتية (Botanical Family Rotation)', def: 'تجنب زراعة محصولين من نفس العائلة (مثل النجيليات) بشكل متتالٍ لكسر دورة الآفات وموازنة النيتروجين.' }
            ]
          : [
              { term: 'Evapotranspiration (ET)', def: 'Combined water lost from soil evaporation and plant leaf transpiration. Higher solar radiation and warming drive ET upward rapidly.' },
              { term: 'Water Balance', def: 'The seasonal difference between effective captured rainfall and crop water demand, showing how much supplemental irrigation is required.' },
              { term: 'Heat-Stress Threshold', def: 'The maximum canopy temperature (max_temp_c) above which pollen viability and grain or pod set drop sharply.' },
              { term: 'Botanical Family Rotation', def: 'Alternating distinct plant families (e.g., Poaceae cereals followed by Fabaceae legumes) across seasons to break pest cycles and restore nitrogen.' }
            ];

      glossaryGrid.innerHTML = terms
        .map(
          (g) =>
            `<div class="glossary-item"><div class="glossary-term">${g.term}</div><p class="glossary-def">${g.def}</p></div>`
        )
        .join('');
    }
  }

  function openCropDetailModal(item, stressEv) {
    const modal = $('cropDetailModal');
    if (!modal) return;

    $('cropModalSeasonBadge').textContent = `${t('seasonWord')} ${item.seasonIndex} · ${getSeasonLabel(item.seasonName)}`;
    $('cropModalTitle').textContent = getCropName(item.crop);
    $('cropModalFamily').textContent = `${item.crop.family} · ${I18N[state.lang].roles[item.functionalRole] || item.functionalRole}`;

    const body = $('cropModalBody');
    body.innerHTML = `
      <div class="crop-modal-grid tabular-nums">
        <div class="sum-item">
          <div class="sum-label">${state.lang === 'ar' ? 'الاحتياج المائي' : 'Water Requirement'}</div>
          <div class="sum-val">${item.crop.water_mm} mm</div>
        </div>
        <div class="sum-item">
          <div class="sum-label">${state.lang === 'ar' ? 'المطر الفعال والعجز' : 'Effective Rain / Gap'}</div>
          <div class="sum-val">${stressEv.effRain} mm / ${stressEv.deficitMm} mm</div>
        </div>
        <div class="sum-item">
          <div class="sum-label">${state.lang === 'ar' ? 'النطاق الحراري المثالي' : 'Optimal Temp Window'}</div>
          <div class="sum-val">${item.crop.opt_temp_c.min}–${item.crop.opt_temp_c.max}°C (Max ${item.crop.max_temp_c}°C)</div>
        </div>
        <div class="sum-item">
          <div class="sum-label">${state.lang === 'ar' ? 'تقدير العائد والأعلاف' : 'Est. Return & Forage'}</div>
          <div class="sum-val">$${item.estReturn.toLocaleString()}/ha · ${item.crop.forage_value}</div>
        </div>
      </div>
      <div class="sum-item">
        <div class="sum-label">${state.lang === 'ar' ? 'سبب الاختيار الزراعي' : 'Agronomic Explanation'}</div>
        <p style="font-size:0.86rem;margin-top:4px;">${item.rationale}</p>
      </div>
      <div class="sum-item">
        <div class="sum-label">${state.lang === 'ar' ? 'تشخيص المناخ الحالي' : 'Active Climate Stress Diagnostic'}</div>
        <p style="font-size:0.86rem;margin-top:4px;">${stressEv.explanation}</p>
      </div>
    `;

    modal.classList.remove('hidden-modal');
  }

  // ---------------------------------------------------------------------------
  // 10. PIPELINE EXECUTION & LIVE REFRESH
  // ---------------------------------------------------------------------------
  async function executePlanGeneration() {
    const modal = $('analysisModal');
    const bar = $('analysisProgressBar');
    const steps = ['anStep1', 'anStep2', 'anStep3', 'anStep4'];

    steps.forEach((id) => $(id) && $(id).classList.remove('done'));
    if (bar) bar.style.width = '18%';
    if (modal) modal.classList.remove('hidden-modal');

    const climatePromise = fetchNasaAndElevation(state.lat, state.lon);

    setTimeout(() => {
      if ($('anStep1')) $('anStep1').classList.add('done');
      if (bar) bar.style.width = '45%';
    }, 180);

    state.climateData = await climatePromise;

    if ($('anStep2')) $('anStep2').classList.add('done');
    if (bar) bar.style.width = '72%';

    computeAllStrategies();
    state.activeStrategyId = 'recommended';

    if ($('anStep3')) $('anStep3').classList.add('done');
    if (bar) bar.style.width = '90%';

    saveCurrentPlotToStorage();

    setTimeout(() => {
      if ($('anStep4')) $('anStep4').classList.add('done');
      if (bar) bar.style.width = '100%';
      setTimeout(() => {
        if (modal) modal.classList.add('hidden-modal');
        setStage('dashboard');
        renderFullDashboard();
      }, 220);
    }, 180);
  }

  async function runLiveDashboardRefresh() {
    const badge = $('nasaSourceBadge');
    if (badge) {
      badge.textContent = state.lang === 'ar' ? 'جاري التحديث...' : 'Fetching NASA Data...';
    }
    state.climateData = await fetchNasaAndElevation(state.lat, state.lon);
    computeAllStrategies();
    saveCurrentPlotToStorage();
    renderFullDashboard();
  }

  function renderFullDashboard() {
    renderFarmContextBar();
    populateDynamicDropdowns();
    renderNasaTelemetryBar();
    renderStrategyCards();
    renderActiveStrategyDetails();
    renderLocalGapsAndGlossary();
    renderPresetContainers();
    renderGardenSwitcher();
  }

  // ---------------------------------------------------------------------------
  // 11. LANGUAGE TOGGLE & EVENT WIRING
  // ---------------------------------------------------------------------------
  function applyLanguage() {
    const isAr = state.lang === 'ar';
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const val = I18N[state.lang][key];
      if (typeof val === 'string') {
        el.textContent = val;
      }
    });

    if ($('citySearchInput')) {
      $('citySearchInput').placeholder = isAr
        ? 'اكتب اسم مدينتك أو منطقتك الزراعية...'
        : 'Type your city, town, or agricultural area...';
    }
    if ($('gardenNameInput')) {
      $('gardenNameInput').placeholder = isAr
        ? 'مثال: حقل بيشة الشمالي، الحديقة المنزلية...'
        : 'e.g. Bisha Terrace Plot, South Field...';
    }

    renderPresetContainers();
    renderCountriesAndRegions();
    renderSoilCards();
    populateDynamicDropdowns();
    renderSavedPlotsWelcome();

    if (state.stage === 'wizard' && state.wizStep === 4) {
      renderWizardSummary();
    }
    if (state.stage === 'dashboard' && state.climateData) {
      computeAllStrategies();
      renderFullDashboard();
    }
  }

  function handleGpsLocate(refreshDash) {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.selectedPresetId = null;
        highlightPresetButtons();
        syncCoordinatesEverywhere(pos.coords.latitude, pos.coords.longitude, null, null, refreshDash);
        if (!refreshDash && state.stage === 'wizard' && state.wizStep === 1) {
          goToWizardStep(2);
        }
      },
      () => {
        // Fallback gracefully to Bisha demo pin if permission denied
        applyDemoPreset('bisha', refreshDash);
      },
      { timeout: 6000 }
    );
  }

  function updateStressPresetButtons() {
    document.querySelectorAll('.scenario-preset-btn').forEach((btn) => {
      const tVal = Number(btn.dataset.temp);
      const rVal = Number(btn.dataset.rain);
      btn.classList.toggle('active', tVal === state.tempShift && rVal === state.rainShift);
    });
  }

  function bindAllEvents() {
    // Language toggle
    $('langToggleBtn').addEventListener('click', () => {
      state.lang = state.lang === 'en' ? 'ar' : 'en';
      applyLanguage();
    });

    // Home trigger
    $('brandHomeTrigger').addEventListener('click', () => setStage('welcome'));
    $('newFarmBtn').addEventListener('click', () => setStage('welcome'));

    // Welcome -> Wizard
    $('startJourneyBtn').addEventListener('click', () => {
      state.activePlotId = null;
      setStage('wizard');
      goToWizardStep(1);
    });

    // Wizard navigation
    document.querySelectorAll('.wiz-prog-item').forEach((tab) => {
      tab.addEventListener('click', () => {
        const step = Number(tab.dataset.wizStep);
        if (!tab.disabled) goToWizardStep(step);
      });
    });

    $('useGpsDirectBtn').addEventListener('click', () => handleGpsLocate(false));
    $('useGpsBtn').addEventListener('click', () => handleGpsLocate(false));
    $('dashGpsBtn').addEventListener('click', () => handleGpsLocate(true));

    $('searchCityBtn').addEventListener('click', () => {
      const c = COUNTRY_CATALOG.find((item) => item.id === state.selectedCountryId);
      if (c) renderRegionsForCountry(c, $('citySearchInput').value);
    });
    $('citySearchInput').addEventListener('input', () => {
      const c = COUNTRY_CATALOG.find((item) => item.id === state.selectedCountryId);
      if (c) renderRegionsForCountry(c, $('citySearchInput').value);
    });

    $('notInListMapBtn').addEventListener('click', () => goToWizardStep(2));
    $('backToStep1Btn').addEventListener('click', () => goToWizardStep(1));
    $('toStep3Btn').addEventListener('click', () => goToWizardStep(3));
    $('backToStep2Btn').addEventListener('click', () => goToWizardStep(2));
    $('toStep4Btn').addEventListener('click', () => goToWizardStep(4));
    $('backToStep3Btn').addEventListener('click', () => goToWizardStep(3));

    $('latInput').addEventListener('change', () => {
      const lat = clamp(parseFloat($('latInput').value) || state.lat, -60, 60);
      const lon = clamp(parseFloat($('lonInput').value) || state.lon, -180, 180);
      syncCoordinatesEverywhere(lat, lon, null, null, false);
    });
    $('lonInput').addEventListener('change', () => {
      const lat = clamp(parseFloat($('latInput').value) || state.lat, -60, 60);
      const lon = clamp(parseFloat($('lonInput').value) || state.lon, -180, 180);
      syncCoordinatesEverywhere(lat, lon, null, null, false);
    });

    // Map layer toggles
    document.querySelectorAll('.map-layer-btn').forEach((btn) => {
      btn.addEventListener('click', () => setMapLayerMode(btn.dataset.layer));
    });

    // Wizard Step 3 & 4 inputs
    $('prevCropSelect').addEventListener('change', (e) => {
      state.prevCrop = e.target.value;
      if ($('dashPrevCropSelect')) $('dashPrevCropSelect').value = state.prevCrop;
    });
    $('seasonSelect').addEventListener('change', (e) => {
      state.startSeason = e.target.value;
      if ($('dashSeasonSelect')) $('dashSeasonSelect').value = state.startSeason;
    });
    $('gardenNameInput').addEventListener('input', (e) => {
      state.gardenName = e.target.value;
    });

    document.querySelectorAll('.priority-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.priority = btn.dataset.priority;
        syncFormControlsWithState();
      });
    });

    $('generateBtn').addEventListener('click', () => {
      executePlanGeneration();
    });

    // Dashboard live parameter adjustments
    $('dashPrevCropSelect').addEventListener('change', (e) => {
      state.prevCrop = e.target.value;
      if ($('prevCropSelect')) $('prevCropSelect').value = state.prevCrop;
      computeAllStrategies();
      saveCurrentPlotToStorage();
      renderFullDashboard();
    });
    $('dashSoilSelect').addEventListener('change', (e) => {
      state.soil = e.target.value;
      computeAllStrategies();
      saveCurrentPlotToStorage();
      renderFullDashboard();
    });
    $('dashSeasonSelect').addEventListener('change', (e) => {
      state.startSeason = e.target.value;
      if ($('seasonSelect')) $('seasonSelect').value = state.startSeason;
      computeAllStrategies();
      saveCurrentPlotToStorage();
      renderFullDashboard();
    });
    $('dashPrioritySelect').addEventListener('change', (e) => {
      state.priority = e.target.value;
      syncFormControlsWithState();
      computeAllStrategies();
      saveCurrentPlotToStorage();
      renderFullDashboard();
    });

    // Dashboard edit / switcher actions
    $('addGardenBtn').addEventListener('click', () => {
      state.activePlotId = null;
      state.gardenName = '';
      setStage('wizard');
      goToWizardStep(1);
    });
    $('editLocationBtn').addEventListener('click', () => {
      setStage('wizard');
      goToWizardStep(2);
    });
    $('editInputsBtn').addEventListener('click', () => {
      setStage('wizard');
      goToWizardStep(3);
    });
    $('gardenSelect').addEventListener('change', (e) => {
      const plot = state.savedPlots.find((p) => p.id === e.target.value);
      if (plot) {
        loadPlotIntoState(plot);
        executePlanGeneration();
      }
    });

    // Pipeline smooth scroll
    document.querySelectorAll('.pipeline-step').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.action === 'edit-inputs') {
          setStage('wizard');
          goToWizardStep(3);
          return;
        }
        const target = $(btn.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Climate Stress-Testing Presets & Sliders
    document.querySelectorAll('.scenario-preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.tempShift = Number(btn.dataset.temp);
        state.rainShift = Number(btn.dataset.rain);
        $('tempShiftSlider').value = state.tempShift;
        $('rainShiftSlider').value = state.rainShift;
        $('tempShiftReadout').textContent = `+${state.tempShift.toFixed(1)}°C`;
        $('rainShiftReadout').textContent = `${state.rainShift > 0 ? '+' : ''}${state.rainShift}%`;
        updateStressPresetButtons();
        renderActiveStrategyDetails();
      });
    });

    $('tempShiftSlider').addEventListener('input', (e) => {
      state.tempShift = Number(e.target.value);
      $('tempShiftReadout').textContent = `+${state.tempShift.toFixed(1)}°C`;
      updateStressPresetButtons();
      renderActiveStrategyDetails();
    });

    $('rainShiftSlider').addEventListener('input', (e) => {
      state.rainShift = Number(e.target.value);
      $('rainShiftReadout').textContent = `${state.rainShift > 0 ? '+' : ''}${state.rainShift}%`;
      updateStressPresetButtons();
      renderActiveStrategyDetails();
    });

    // Crop Detail Modal Close
    $('closeCropModalBtn').addEventListener('click', () => {
      $('cropDetailModal').classList.add('hidden-modal');
    });
    $('cropDetailModal').addEventListener('click', (e) => {
      if (e.target === $('cropDetailModal')) {
        $('cropDetailModal').classList.add('hidden-modal');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 12. INITIALIZATION
  // ---------------------------------------------------------------------------
  async function init() {
    loadSavedPlots();

    try {
      const res = await fetch('crops.json');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      state.crops = Array.isArray(data) && data.length ? data : FALLBACK_CROPS;
    } catch (_err) {
      state.crops = FALLBACK_CROPS;
    }

    bindAllEvents();
    applyLanguage();
    syncFormControlsWithState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
