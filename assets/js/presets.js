// assets/js/presets.js
export const routinePresets = {
    ppl: {
        tabs: ['push', 'pull', 'legs', 'crisol', 'neat'],
        tabLabels: { push: 'Empuje', pull: 'Tracción', legs: 'Pierna', crisol: 'El Crisol', neat: 'NEAT / Cardio' },
        data: {
            push: [
                { id: 'p1', name: 'Floor Press con mancuernas (20 kg)', target: '4x6-8', alt: 'Flexiones declinadas o en pared', express: true, sets: [{ weight: 20, reps: 8, rpe: 8 }] },
                { id: 'p2', name: 'Press Inclinado / Flexiones', target: '3x8-10', alt: 'Flexiones asistidas con rodillas', express: false, sets: [{ weight: 15, reps: 10, rpe: 7 }] },
                { id: 'p3', name: 'Fondos en paralelas', target: '3x Al fallo (-2)', alt: 'Fondos en silla de hule o banco', express: false, sets: [{ weight: 0, reps: 12, rpe: 9 }] },
                { id: 'p4', name: 'Press Militar con mancuernas', target: '3x8-10', alt: 'Elevaciones de brazos sin peso (movilidad)', express: true, sets: [{ weight: 14, reps: 10, rpe: 8 }] },
                { id: 'p5', name: 'Elevaciones laterales', target: '4x12-15', alt: 'Elevaciones con botellas de agua', express: false, sets: [{ weight: 8, reps: 15, rpe: 9 }] }
            ],
            pull: [
                { id: 'l1', name: 'Dominadas estrictas en barra fija', target: '4x Máximas', alt: 'Remo con toalla en puerta', express: true, sets: [{ weight: 0, reps: 8, rpe: 9 }] },
                { id: 'l2', name: 'Remo con mancuerna a una mano', target: '4x8-10', alt: 'Remo con garrafón de agua', express: true, sets: [{ weight: 22, reps: 10, rpe: 8 }] },
                { id: 'l3', name: 'Curl de bíceps (Spider / Preacher)', target: '4x10-12', alt: 'Curl con mochila con libros', express: false, sets: [{ weight: 12, reps: 12, rpe: 8 }] }
            ],
            legs: [
                { id: 'lg1', name: 'Prensa o Sentadilla Goblet', target: '4x10-12', alt: 'Sentadilla a silla sin peso', express: true, sets: [{ weight: 24, reps: 12, rpe: 8 }] },
                { id: 'lg2', name: 'Zancadas búlgaras con mancuernas', target: '3x10 por pierna', alt: 'Puente de glúteo en suelo (cero rodilla)', express: false, sets: [{ weight: 10, reps: 10, rpe: 8 }] },
                { id: 'lg3', name: 'Peso Muerto Rumano', target: '4x10-12', alt: 'Buenos días sin peso / Flexión cadera', express: true, sets: [{ weight: 20, reps: 12, rpe: 7 }] }
            ],
            crisol: [
                { id: 'c1', name: 'Circuito Metabólico - Vuelta 1', target: 'Dominadas + Fondos + Flexiones', alt: 'Movilidad continua en silla', express: true, sets: [{ weight: 0, reps: 15, rpe: 9 }] },
                { id: 'c2', name: 'Circuito Metabólico - Vuelta 2', target: 'Dominadas + Fondos + Flexiones', alt: 'Pausas activas y estiramientos', express: false, sets: [{ weight: 0, reps: 15, rpe: 9 }] }
            ],
            neat: [
                { id: 'n1', name: 'Ruta Centro ➔ Ávila Camacho', target: '3-4 km con pendientes', alt: 'Caminata en pasillo o jardín', express: true, sets: [{ km: 3.5, mins: 45, rpe: 5 }] },
                { id: 'n2', name: 'Caminata nocturna de descarga', target: '30 mins ritmo ligero', alt: '10 mins estiramientos en cama', express: false, sets: [{ km: 2.0, mins: 30, rpe: 4 }] }
            ]
        }
    },
    torso_pierna: {
        tabs: ['torso1', 'pierna1', 'torso2', 'pierna2', 'neat'],
        tabLabels: { torso1: 'Torso A', pierna1: 'Pierna A', torso2: 'Torso B', pierna2: 'Pierna B', neat: 'NEAT / Cardio' },
        data: {
            torso1: [
                { id: 'tp_t1', name: 'Press Banca / Floor Press', target: '4x8-10', alt: 'Flexiones en suelo', express: true, sets: [{ weight: 20, reps: 10, rpe: 8 }] },
                { id: 'tp_t2', name: 'Remo con Mancuerna', target: '4x8-10', alt: 'Remo invertido en mesa', express: true, sets: [{ weight: 22, reps: 10, rpe: 8 }] }
            ],
            pierna1: [
                { id: 'tp_p1', name: 'Sentadilla Goblet', target: '4x10-12', alt: 'Sentadilla libre sin peso', express: true, sets: [{ weight: 24, reps: 10, rpe: 8 }] },
                { id: 'tp_p2', name: 'Peso Muerto Rumano', target: '4x10-12', alt: 'Flexión de cadera postural', express: true, sets: [{ weight: 20, reps: 12, rpe: 7 }] }
            ],
            torso2: [
                { id: 'tp_t3', name: 'Press Militar', target: '4x8-10', alt: 'Elevaciones de hombro sin carga', express: true, sets: [{ weight: 14, reps: 8, rpe: 8 }] },
                { id: 'tp_t4', name: 'Dominadas / Jalón', target: '4x8-10', alt: 'Remo con banda elástica', express: true, sets: [{ weight: 0, reps: 8, rpe: 8 }] }
            ],
            pierna2: [
                { id: 'tp_p3', name: 'Zancadas con Peso', target: '3x10 por pierna', alt: 'Zancadas fijas sin peso', express: true, sets: [{ weight: 12, reps: 10, rpe: 8 }] }
            ],
            neat: [
                { id: 'tp_n1', name: 'Caminata de Descarga', target: '30 mins', alt: 'Estiramientos suaves', express: true, sets: [{ km: 2.5, mins: 30, rpe: 4 }] }
            ]
        }
    },
    full_body: {
        tabs: ['sessionA', 'sessionB', 'sessionC', 'neat'],
        tabLabels: { sessionA: 'Día 1 (Full)', sessionB: 'Día 2 (Full)', sessionC: 'Día 3 (Full)', neat: 'NEAT / Cardio' },
        data: {
            sessionA: [
                { id: 'fb_1', name: 'Sentadilla Goblet', target: '3x8-10', alt: 'Sentadilla a silla', express: true, sets: [{ weight: 20, reps: 10, rpe: 8 }] },
                { id: 'fb_2', name: 'Floor Press con Mancuernas', target: '3x8-10', alt: 'Flexiones en suelo', express: true, sets: [{ weight: 20, reps: 10, rpe: 8 }] },
                { id: 'fb_3', name: 'Remo a una mano', target: '3x10', alt: 'Remo con garrafón', express: true, sets: [{ weight: 18, reps: 10, rpe: 8 }] }
            ],
            sessionB: [
                { id: 'fb_4', name: 'Peso Muerto Rumano', target: '3x10', alt: 'Puente de glúteo', express: true, sets: [{ weight: 20, reps: 10, rpe: 7 }] },
                { id: 'fb_5', name: 'Press Militar', target: '3x10', alt: 'Flexiones pino asistidas', express: true, sets: [{ weight: 12, reps: 10, rpe: 8 }] },
                { id: 'fb_6', name: 'Dominadas / Remo', target: '3x Máximas', alt: 'Remo con toalla', express: true, sets: [{ weight: 0, reps: 8, rpe: 8 }] }
            ],
            sessionC: [
                { id: 'fb_7', name: 'Zancadas con peso', target: '3x12', alt: 'Zancadas libres', express: true, sets: [{ weight: 12, reps: 12, rpe: 8 }] },
                { id: 'fb_8', name: 'Fondos en paralelas', target: '3x Al fallo', alt: 'Fondos en banco', express: true, sets: [{ weight: 0, reps: 10, rpe: 9 }] }
            ],
            neat: [
                { id: 'fb_n1', name: 'Cardio Ligero', target: '20 mins', alt: 'Caminata rítmica', express: true, sets: [{ km: 2.0, mins: 20, rpe: 5 }] }
            ]
        }
    },
    arnold: {
        tabs: ['chest_back', 'shoulders_arms', 'legs_arnold', 'neat'],
        tabLabels: { chest_back: 'Pecho + Espalda', shoulders_arms: 'Hombro + Brazo', legs_arnold: 'Pierna', neat: 'NEAT / Cardio' },
        data: {
            chest_back: [{ id: 'arn_1', name: 'Floor Press + Remo con Mancuerna', target: '4x8-10', alt: 'Flexiones + Remo', express: true, sets: [{ weight: 20, reps: 10, rpe: 9 }] }],
            shoulders_arms: [{ id: 'arn_2', name: 'Press Militar + Curl Bíceps', target: '4x10-12', alt: 'Elevaciones + Curl con botellas', express: true, sets: [{ weight: 12, reps: 12, rpe: 8 }] }],
            legs_arnold: [{ id: 'arn_3', name: 'Sentadillas + Peso Muerto', target: '4x10', alt: 'Sentadilla libre + Puente', express: true, sets: [{ weight: 24, reps: 10, rpe: 8 }] }],
            neat: [{ id: 'arn_n1', name: 'Caminata Urbana', target: '30 mins', alt: 'Caminata ligera', express: true, sets: [{ km: 3.0, mins: 30, rpe: 5 }] }]
        }
    },
    calistenia: {
        tabs: ['push_cali', 'pull_cali', 'legs_cali', 'core_cali'],
        tabLabels: { push_cali: 'Empuje Corporal', pull_cali: 'Tracción Corporal', legs_cali: 'Piernas / Salto', core_cali: 'Core / Abdominales' },
        data: {
            push_cali: [
                { id: 'cal_1', name: 'Flexiones estrictas en suelo', target: '4x12-15', alt: 'Flexiones apoyando rodillas', express: true, sets: [{ weight: 0, reps: 15, rpe: 8 }] },
                { id: 'cal_2', name: 'Fondos entre sillas', target: '3x10-12', alt: 'Fondos en suelo', express: true, sets: [{ weight: 0, reps: 12, rpe: 8 }] }
            ],
            pull_cali: [{ id: 'cal_3', name: 'Dominadas en barra fija', target: '4x Máximas', alt: 'Remo invertido bajo mesa', express: true, sets: [{ weight: 0, reps: 8, rpe: 9 }] }],
            legs_cali: [{ id: 'cal_5', name: 'Sentadillas con salto explosivas', target: '4x15', alt: 'Sentadillas fluidas sin salto', express: true, sets: [{ weight: 0, reps: 15, rpe: 8 }] }],
            core_cali: [{ id: 'cal_7', name: 'Plancha abdominal estática', target: '3x 45s', alt: 'Plancha apoyando rodillas', express: true, sets: [{ weight: 0, reps: 45, rpe: 8 }] }]
        }
    }
};

export const achievementBadges = [
    { id: 'b_first', name: 'Primer Paso', icon: 'fa-shoe-prints', desc: 'Registra tu primer día' },
    { id: 'b_streak7', name: '7 Días Invicto', icon: 'fa-fire-flame-curved', desc: 'Racha de 7 días' },
    { id: 'b_water', name: 'Tanque de Agua', icon: 'fa-faucet-drip', desc: 'Alcanza 3.0L de agua' },
    { id: 'b_level5', name: 'Cyber Guerrero', icon: 'fa-shield-halved', desc: 'Alcanza el Nivel 5' }
];