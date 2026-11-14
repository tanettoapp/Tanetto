/* Etichette del resoconto senza numero (il numero è mostrato a parte) */
[["it", "obiettivi completati", "giorni attivi", "di fila"], ["en", "goals completed", "active days", "in a row"], ["de", "Ziele geschafft", "aktive Tage", "in Folge"], ["es", "objetivos cumplidos", "días activos", "seguidos"],
 ["fr", "objectifs atteints", "jours actifs", "d'affilée"], ["pt", "metas concluídas", "dias ativos", "seguidos"], ["nl", "doelen gehaald", "actieve dagen", "op rij"], ["pl", "ukończone cele", "aktywne dni", "z rzędu"],
 ["tr", "tamamlanan hedef", "aktif gün", "üst üste"], ["ru", "выполненные цели", "активные дни", "подряд"], ["ja", "達成した目標", "がんばった日", "連続"], ["ko", "달성한 목표", "활동한 날", "연속"],
 ["zh", "完成的目标", "活跃天数", "连续"], ["zht", "完成的目標", "活躍天數", "連續"]].forEach(([l, g, d, s]) => { if (T[l] && T[l].rep) Object.assign(T[l].rep, { goalsL: g, daysL: d, streakL: s }); });
