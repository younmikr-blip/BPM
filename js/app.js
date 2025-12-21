// 전역 변수
let slides = [];
let currentSlideIndex = 0;
let bibleDatabase = null; // 성경 데이터베이스 캐시

// 성경 구조 데이터 (책별 장 수와 장별 절 수)
const bibleStructure = {
    "창세기": { chapters: 50, verses: { 1: 31, 2: 25, 3: 24, 4: 26, 5: 32, 6: 22, 7: 24, 8: 22, 9: 29, 10: 32, 11: 32, 12: 20, 13: 18, 14: 24, 15: 21, 16: 16, 17: 27, 18: 33, 19: 38, 20: 18, 21: 34, 22: 24, 23: 20, 24: 67, 25: 34, 26: 35, 27: 46, 28: 22, 29: 35, 30: 43, 31: 55, 32: 32, 33: 20, 34: 31, 35: 29, 36: 43, 37: 36, 38: 30, 39: 23, 40: 23, 41: 57, 42: 38, 43: 34, 44: 34, 45: 28, 46: 34, 47: 31, 48: 22, 49: 33, 50: 26 }},
    "출애굽기": { chapters: 40, verses: { 1: 22, 2: 25, 3: 22, 4: 31, 5: 23, 6: 30, 7: 25, 8: 32, 9: 35, 10: 29, 11: 10, 12: 51, 13: 22, 14: 31, 15: 27, 16: 36, 17: 16, 18: 27, 19: 25, 20: 26, 21: 36, 22: 31, 23: 33, 24: 18, 25: 40, 26: 37, 27: 21, 28: 43, 29: 46, 30: 38, 31: 18, 32: 35, 33: 23, 34: 35, 35: 35, 36: 38, 37: 29, 38: 31, 39: 43, 40: 38 }},
    "레위기": { chapters: 27, verses: { 1: 17, 2: 16, 3: 17, 4: 35, 5: 19, 6: 30, 7: 38, 8: 36, 9: 24, 10: 20, 11: 47, 12: 8, 13: 59, 14: 57, 15: 33, 16: 34, 17: 16, 18: 30, 19: 37, 20: 27, 21: 24, 22: 33, 23: 44, 24: 23, 25: 55, 26: 46, 27: 34 }},
    "민수기": { chapters: 36, verses: { 1: 54, 2: 34, 3: 51, 4: 49, 5: 31, 6: 27, 7: 89, 8: 26, 9: 23, 10: 36, 11: 35, 12: 16, 13: 33, 14: 45, 15: 41, 16: 50, 17: 13, 18: 32, 19: 22, 20: 29, 21: 35, 22: 41, 23: 30, 24: 25, 25: 18, 26: 65, 27: 23, 28: 31, 29: 40, 30: 16, 31: 54, 32: 42, 33: 56, 34: 29, 35: 34, 36: 13 }},
    "신명기": { chapters: 34, verses: { 1: 46, 2: 37, 3: 29, 4: 49, 5: 33, 6: 25, 7: 26, 8: 20, 9: 29, 10: 22, 11: 32, 12: 32, 13: 18, 14: 29, 15: 23, 16: 22, 17: 20, 18: 22, 19: 21, 20: 20, 21: 23, 22: 30, 23: 25, 24: 22, 25: 19, 26: 19, 27: 26, 28: 68, 29: 29, 30: 20, 31: 30, 32: 52, 33: 29, 34: 12 }},
    "여호수아": { chapters: 24, verses: { 1: 18, 2: 24, 3: 17, 4: 24, 5: 15, 6: 27, 7: 26, 8: 35, 9: 27, 10: 43, 11: 23, 12: 24, 13: 33, 14: 15, 15: 63, 16: 10, 17: 18, 18: 28, 19: 51, 20: 9, 21: 45, 22: 34, 23: 16, 24: 33 }},
    "사사기": { chapters: 21, verses: { 1: 36, 2: 23, 3: 31, 4: 24, 5: 31, 6: 40, 7: 25, 8: 35, 9: 57, 10: 18, 11: 40, 12: 15, 13: 25, 14: 20, 15: 20, 16: 31, 17: 13, 18: 31, 19: 30, 20: 48, 21: 25 }},
    "룻기": { chapters: 4, verses: { 1: 22, 2: 23, 3: 18, 4: 22 }},
    "사무엘상": { chapters: 31, verses: { 1: 28, 2: 36, 3: 21, 4: 22, 5: 12, 6: 21, 7: 17, 8: 22, 9: 27, 10: 27, 11: 15, 12: 25, 13: 23, 14: 52, 15: 35, 16: 23, 17: 58, 18: 30, 19: 24, 20: 42, 21: 15, 22: 23, 23: 29, 24: 22, 25: 44, 26: 25, 27: 12, 28: 25, 29: 11, 30: 31, 31: 13 }},
    "사무엘하": { chapters: 24, verses: { 1: 27, 2: 32, 3: 39, 4: 12, 5: 25, 6: 23, 7: 29, 8: 18, 9: 13, 10: 19, 11: 27, 12: 31, 13: 39, 14: 33, 15: 37, 16: 23, 17: 29, 18: 33, 19: 43, 20: 26, 21: 22, 22: 51, 23: 39, 24: 25 }},
    "열왕기상": { chapters: 22, verses: { 1: 53, 2: 46, 3: 28, 4: 34, 5: 18, 6: 38, 7: 51, 8: 66, 9: 28, 10: 29, 11: 43, 12: 33, 13: 34, 14: 31, 15: 34, 16: 34, 17: 24, 18: 46, 19: 21, 20: 43, 21: 29, 22: 53 }},
    "열왕기하": { chapters: 25, verses: { 1: 18, 2: 25, 3: 27, 4: 44, 5: 27, 6: 33, 7: 20, 8: 29, 9: 37, 10: 36, 11: 21, 12: 21, 13: 25, 14: 29, 15: 38, 16: 20, 17: 41, 18: 37, 19: 37, 20: 21, 21: 26, 22: 20, 23: 37, 24: 20, 25: 30 }},
    "역대상": { chapters: 29, verses: { 1: 54, 2: 55, 3: 24, 4: 43, 5: 26, 6: 81, 7: 40, 8: 40, 9: 44, 10: 14, 11: 47, 12: 40, 13: 14, 14: 17, 15: 29, 16: 43, 17: 27, 18: 17, 19: 19, 20: 8, 21: 30, 22: 19, 23: 32, 24: 31, 25: 31, 26: 32, 27: 34, 28: 21, 29: 30 }},
    "역대하": { chapters: 36, verses: { 1: 17, 2: 18, 3: 17, 4: 22, 5: 14, 6: 42, 7: 22, 8: 18, 9: 31, 10: 19, 11: 23, 12: 16, 13: 22, 14: 15, 15: 19, 16: 14, 17: 19, 18: 34, 19: 11, 20: 37, 21: 20, 22: 12, 23: 21, 24: 27, 25: 28, 26: 23, 27: 9, 28: 27, 29: 36, 30: 27, 31: 21, 32: 33, 33: 25, 34: 33, 35: 27, 36: 23 }},
    "에스라": { chapters: 10, verses: { 1: 11, 2: 70, 3: 13, 4: 24, 5: 17, 6: 22, 7: 28, 8: 36, 9: 15, 10: 44 }},
    "느헤미야": { chapters: 13, verses: { 1: 11, 2: 20, 3: 32, 4: 23, 5: 19, 6: 19, 7: 73, 8: 18, 9: 38, 10: 39, 11: 36, 12: 47, 13: 31 }},
    "에스더": { chapters: 10, verses: { 1: 22, 2: 23, 3: 15, 4: 17, 5: 14, 6: 14, 7: 10, 8: 17, 9: 32, 10: 3 }},
    "욥기": { chapters: 42, verses: { 1: 22, 2: 13, 3: 26, 4: 21, 5: 27, 6: 30, 7: 21, 8: 22, 9: 35, 10: 22, 11: 20, 12: 25, 13: 28, 14: 22, 15: 35, 16: 22, 17: 16, 18: 21, 19: 29, 20: 29, 21: 34, 22: 30, 23: 17, 24: 25, 25: 6, 26: 14, 27: 23, 28: 28, 29: 25, 30: 31, 31: 40, 32: 22, 33: 33, 34: 37, 35: 16, 36: 33, 37: 24, 38: 41, 39: 30, 40: 24, 41: 34, 42: 17 }},
    "시편": { chapters: 150, verses: { 1: 6, 2: 12, 3: 8, 4: 8, 5: 12, 6: 10, 7: 17, 8: 9, 9: 20, 10: 18, 11: 7, 12: 8, 13: 6, 14: 7, 15: 5, 16: 11, 17: 15, 18: 50, 19: 14, 20: 9, 21: 13, 22: 31, 23: 6, 24: 10, 25: 22, 26: 12, 27: 14, 28: 9, 29: 11, 30: 12, 31: 24, 32: 11, 33: 22, 34: 22, 35: 28, 36: 12, 37: 40, 38: 22, 39: 13, 40: 17, 41: 13, 42: 11, 43: 5, 44: 26, 45: 17, 46: 11, 47: 9, 48: 14, 49: 20, 50: 23, 51: 19, 52: 9, 53: 6, 54: 7, 55: 23, 56: 13, 57: 11, 58: 11, 59: 17, 60: 12, 61: 8, 62: 12, 63: 11, 64: 10, 65: 13, 66: 20, 67: 7, 68: 35, 69: 36, 70: 5, 71: 24, 72: 20, 73: 28, 74: 23, 75: 10, 76: 12, 77: 20, 78: 72, 79: 13, 80: 19, 81: 16, 82: 8, 83: 18, 84: 12, 85: 13, 86: 17, 87: 7, 88: 18, 89: 52, 90: 17, 91: 16, 92: 15, 93: 5, 94: 23, 95: 11, 96: 13, 97: 12, 98: 9, 99: 9, 100: 5, 101: 8, 102: 28, 103: 22, 104: 35, 105: 45, 106: 48, 107: 43, 108: 13, 109: 31, 110: 7, 111: 10, 112: 10, 113: 9, 114: 8, 115: 18, 116: 19, 117: 2, 118: 29, 119: 176, 120: 7, 121: 8, 122: 9, 123: 4, 124: 8, 125: 5, 126: 6, 127: 5, 128: 6, 129: 8, 130: 8, 131: 3, 132: 18, 133: 3, 134: 3, 135: 21, 136: 26, 137: 9, 138: 8, 139: 24, 140: 13, 141: 10, 142: 7, 143: 12, 144: 15, 145: 21, 146: 10, 147: 20, 148: 14, 149: 9, 150: 6 }},
    "잠언": { chapters: 31, verses: { 1: 33, 2: 22, 3: 35, 4: 27, 5: 23, 6: 35, 7: 27, 8: 36, 9: 18, 10: 32, 11: 31, 12: 28, 13: 25, 14: 35, 15: 33, 16: 33, 17: 28, 18: 24, 19: 29, 20: 30, 21: 31, 22: 29, 23: 35, 24: 34, 25: 28, 26: 28, 27: 27, 28: 28, 29: 27, 30: 33, 31: 31 }},
    "전도서": { chapters: 12, verses: { 1: 18, 2: 26, 3: 22, 4: 16, 5: 20, 6: 12, 7: 29, 8: 17, 9: 18, 10: 20, 11: 10, 12: 14 }},
    "아가": { chapters: 8, verses: { 1: 17, 2: 17, 3: 11, 4: 16, 5: 16, 6: 13, 7: 13, 8: 14 }},
    "이사야": { chapters: 66, verses: { 1: 31, 2: 22, 3: 26, 4: 6, 5: 30, 6: 13, 7: 25, 8: 22, 9: 21, 10: 34, 11: 16, 12: 6, 13: 22, 14: 32, 15: 9, 16: 14, 17: 14, 18: 7, 19: 25, 20: 6, 21: 17, 22: 25, 23: 18, 24: 23, 25: 12, 26: 21, 27: 13, 28: 29, 29: 24, 30: 33, 31: 9, 32: 20, 33: 24, 34: 17, 35: 10, 36: 22, 37: 38, 38: 22, 39: 8, 40: 31, 41: 29, 42: 25, 43: 28, 44: 28, 45: 25, 46: 13, 47: 15, 48: 22, 49: 26, 50: 11, 51: 23, 52: 15, 53: 12, 54: 17, 55: 11, 56: 12, 57: 21, 58: 14, 59: 21, 60: 22, 61: 11, 62: 12, 63: 19, 64: 12, 65: 25, 66: 24 }},
    "예레미야": { chapters: 52, verses: { 1: 19, 2: 37, 3: 25, 4: 31, 5: 31, 6: 30, 7: 34, 8: 22, 9: 26, 10: 25, 11: 23, 12: 17, 13: 27, 14: 22, 15: 21, 16: 21, 17: 27, 18: 23, 19: 15, 20: 18, 21: 14, 22: 30, 23: 40, 24: 10, 25: 38, 26: 24, 27: 22, 28: 17, 29: 32, 30: 24, 31: 40, 32: 44, 33: 26, 34: 22, 35: 19, 36: 32, 37: 21, 38: 28, 39: 18, 40: 16, 41: 18, 42: 22, 43: 13, 44: 30, 45: 5, 46: 28, 47: 7, 48: 47, 49: 39, 50: 46, 51: 64, 52: 34 }},
    "예레미야애가": { chapters: 5, verses: { 1: 22, 2: 22, 3: 66, 4: 22, 5: 22 }},
    "에스겔": { chapters: 48, verses: { 1: 28, 2: 10, 3: 27, 4: 17, 5: 17, 6: 14, 7: 27, 8: 18, 9: 11, 10: 22, 11: 25, 12: 28, 13: 23, 14: 23, 15: 8, 16: 63, 17: 24, 18: 32, 19: 14, 20: 49, 21: 32, 22: 31, 23: 49, 24: 27, 25: 17, 26: 21, 27: 36, 28: 26, 29: 21, 30: 26, 31: 18, 32: 32, 33: 33, 34: 31, 35: 15, 36: 38, 37: 28, 38: 23, 39: 29, 40: 49, 41: 26, 42: 20, 43: 27, 44: 31, 45: 25, 46: 24, 47: 23, 48: 35 }},
    "다니엘": { chapters: 12, verses: { 1: 21, 2: 49, 3: 30, 4: 37, 5: 31, 6: 28, 7: 28, 8: 27, 9: 27, 10: 21, 11: 45, 12: 13 }},
    "호세아": { chapters: 14, verses: { 1: 11, 2: 23, 3: 5, 4: 19, 5: 15, 6: 11, 7: 16, 8: 14, 9: 17, 10: 15, 11: 12, 12: 14, 13: 16, 14: 9 }},
    "요엘": { chapters: 3, verses: { 1: 20, 2: 32, 3: 21 }},
    "아모스": { chapters: 9, verses: { 1: 15, 2: 16, 3: 15, 4: 13, 5: 27, 6: 14, 7: 17, 8: 14, 9: 15 }},
    "오바댜": { chapters: 1, verses: { 1: 21 }},
    "요나": { chapters: 4, verses: { 1: 17, 2: 10, 3: 10, 4: 11 }},
    "미가": { chapters: 7, verses: { 1: 16, 2: 13, 3: 12, 4: 13, 5: 15, 6: 16, 7: 20 }},
    "나훔": { chapters: 3, verses: { 1: 15, 2: 13, 3: 19 }},
    "하박국": { chapters: 3, verses: { 1: 17, 2: 20, 3: 19 }},
    "스바냐": { chapters: 3, verses: { 1: 18, 2: 15, 3: 20 }},
    "학개": { chapters: 2, verses: { 1: 15, 2: 23 }},
    "스가랴": { chapters: 14, verses: { 1: 21, 2: 13, 3: 10, 4: 14, 5: 11, 6: 15, 7: 14, 8: 23, 9: 17, 10: 12, 11: 17, 12: 14, 13: 9, 14: 21 }},
    "말라기": { chapters: 4, verses: { 1: 14, 2: 17, 3: 18, 4: 6 }},
    "마태복음": { chapters: 28, verses: { 1: 25, 2: 23, 3: 17, 4: 25, 5: 48, 6: 34, 7: 29, 8: 34, 9: 38, 10: 42, 11: 30, 12: 50, 13: 58, 14: 36, 15: 39, 16: 28, 17: 27, 18: 35, 19: 30, 20: 34, 21: 46, 22: 46, 23: 39, 24: 51, 25: 46, 26: 75, 27: 66, 28: 20 }},
    "마가복음": { chapters: 16, verses: { 1: 45, 2: 28, 3: 35, 4: 41, 5: 43, 6: 56, 7: 37, 8: 38, 9: 50, 10: 52, 11: 33, 12: 44, 13: 37, 14: 72, 15: 47, 16: 20 }},
    "누가복음": { chapters: 24, verses: { 1: 80, 2: 52, 3: 38, 4: 44, 5: 39, 6: 49, 7: 50, 8: 56, 9: 62, 10: 42, 11: 54, 12: 59, 13: 35, 14: 35, 15: 32, 16: 31, 17: 37, 18: 43, 19: 48, 20: 47, 21: 38, 22: 71, 23: 56, 24: 53 }},
    "요한복음": { chapters: 21, verses: { 1: 51, 2: 25, 3: 36, 4: 54, 5: 47, 6: 71, 7: 53, 8: 59, 9: 41, 10: 42, 11: 57, 12: 50, 13: 38, 14: 31, 15: 27, 16: 33, 17: 26, 18: 40, 19: 42, 20: 31, 21: 25 }},
    "사도행전": { chapters: 28, verses: { 1: 26, 2: 47, 3: 26, 4: 37, 5: 42, 6: 15, 7: 60, 8: 40, 9: 43, 10: 48, 11: 30, 12: 25, 13: 52, 14: 28, 15: 41, 16: 40, 17: 34, 18: 28, 19: 41, 20: 38, 21: 40, 22: 30, 23: 35, 24: 27, 25: 27, 26: 32, 27: 44, 28: 31 }},
    "로마서": { chapters: 16, verses: { 1: 32, 2: 29, 3: 31, 4: 25, 5: 21, 6: 23, 7: 25, 8: 39, 9: 33, 10: 21, 11: 36, 12: 21, 13: 14, 14: 23, 15: 33, 16: 27 }},
    "고린도전서": { chapters: 16, verses: { 1: 31, 2: 16, 3: 23, 4: 21, 5: 13, 6: 20, 7: 40, 8: 13, 9: 27, 10: 33, 11: 34, 12: 31, 13: 13, 14: 40, 15: 58, 16: 24 }},
    "고린도후서": { chapters: 13, verses: { 1: 24, 2: 17, 3: 18, 4: 18, 5: 21, 6: 18, 7: 16, 8: 24, 9: 15, 10: 18, 11: 33, 12: 21, 13: 14 }},
    "갈라디아서": { chapters: 6, verses: { 1: 24, 2: 21, 3: 29, 4: 31, 5: 26, 6: 18 }},
    "에베소서": { chapters: 6, verses: { 1: 23, 2: 22, 3: 21, 4: 32, 5: 33, 6: 24 }},
    "빌립보서": { chapters: 4, verses: { 1: 30, 2: 30, 3: 21, 4: 23 }},
    "골로새서": { chapters: 4, verses: { 1: 29, 2: 23, 3: 25, 4: 18 }},
    "데살로니가전서": { chapters: 5, verses: { 1: 10, 2: 20, 3: 13, 4: 18, 5: 28 }},
    "데살로니가후서": { chapters: 3, verses: { 1: 12, 2: 17, 3: 18 }},
    "디모데전서": { chapters: 6, verses: { 1: 20, 2: 15, 3: 16, 4: 16, 5: 25, 6: 21 }},
    "디모데후서": { chapters: 4, verses: { 1: 18, 2: 26, 3: 17, 4: 22 }},
    "디도서": { chapters: 3, verses: { 1: 16, 2: 15, 3: 15 }},
    "빌레몬서": { chapters: 1, verses: { 1: 25 }},
    "히브리서": { chapters: 13, verses: { 1: 14, 2: 18, 3: 19, 4: 16, 5: 14, 6: 20, 7: 28, 8: 13, 9: 28, 10: 39, 11: 40, 12: 29, 13: 25 }},
    "야고보서": { chapters: 5, verses: { 1: 27, 2: 26, 3: 18, 4: 17, 5: 20 }},
    "베드로전서": { chapters: 5, verses: { 1: 25, 2: 25, 3: 22, 4: 19, 5: 14 }},
    "베드로후서": { chapters: 3, verses: { 1: 21, 2: 22, 3: 18 }},
    "요한일서": { chapters: 5, verses: { 1: 10, 2: 29, 3: 24, 4: 21, 5: 21 }},
    "요한이서": { chapters: 1, verses: { 1: 13 }},
    "요한삼서": { chapters: 1, verses: { 1: 14 }},
    "유다서": { chapters: 1, verses: { 1: 25 }},
    "요한계시록": { chapters: 22, verses: { 1: 20, 2: 29, 3: 22, 4: 11, 5: 14, 6: 17, 7: 17, 8: 13, 9: 21, 10: 11, 11: 19, 12: 17, 13: 18, 14: 20, 15: 8, 16: 21, 17: 18, 18: 24, 19: 21, 20: 15, 21: 27, 22: 21 }}
};

// DOM 요소들
const bookSelect = document.getElementById('book-select');
const chapterNumInput = document.getElementById('chapter');
const verseInput = document.getElementById('verse');
const generateSlidesBtn = document.getElementById('generate-slides');
const clearSlidesBtn = document.getElementById('clear-slides');
const slidesContainer = document.getElementById('slides-container');
const startPresentationBtn = document.getElementById('start-presentation');
const downloadPptBtn = document.getElementById('download-ppt');
const generateBtnText = document.getElementById('generate-btn-text');

// PPT 스타일 요소들
const bgColorInput = document.getElementById('bg-color');
const textColorInput = document.getElementById('text-color');
const bgPreview = document.getElementById('bg-preview');
const textPreview = document.getElementById('text-preview');

// 배경 설정 요소들
const backgroundTypeRadios = document.querySelectorAll('input[name="background-type"]');
const colorBackgroundSetting = document.getElementById('color-background-setting');
const imageBackgroundSetting = document.getElementById('image-background-setting');
const bgImageInput = document.getElementById('bg-image');
const clearBgImageBtn = document.getElementById('clear-bg-image');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const imageName = document.getElementById('image-name');
const imageSize = document.getElementById('image-size');

// 템플릿 요소들
const saveTemplateBtn = document.getElementById('save-template');

// 새로운 설정 요소들
const textAlignRadios = document.querySelectorAll('input[name="text-align"]');
const showReferenceCheckbox = document.getElementById('show-reference');
const showVerseNumberCheckbox = document.getElementById('show-verse-number');
// textWidthRadios 는 슬라이더로 대체됨
const textPositionRadios = document.querySelectorAll('input[name="text-position"]');

// 텍스트 크기 요소들
const referenceSizeSlider = document.getElementById('reference-size');
const verseSizeSlider = document.getElementById('verse-size');
const referenceSizeValue = document.getElementById('reference-size-value');
const verseSizeValue = document.getElementById('verse-size-value');
const lineSpacingSlider = document.getElementById('line-spacing');
const lineSpacingValue = document.getElementById('line-spacing-value');
const charSpacingSlider = document.getElementById('char-spacing');
const charSpacingValue = document.getElementById('char-spacing-value');
const textWidthSlider = document.getElementById('text-width-slider');
const textWidthValue = document.getElementById('text-width-value');

// 세로 위치 요소들
const verticalPositionSlider = document.getElementById('vertical-position-slider');
const verticalPositionValue = document.getElementById('vertical-position-value');
const verticalPositionSetting = document.getElementById('vertical-position-setting');

// 폰트 설정 요소들
const fontFamilySelect = document.getElementById('font-family');
const fontWeightRadios = document.querySelectorAll('input[name="font-weight"]');

// 템플릿 관리 요소들
const templateNameInput = document.getElementById('template-name');
const saveNewTemplateBtn = document.getElementById('save-new-template');
const templateList = document.getElementById('template-list');

// 새로운 구간 입력 요소들
const inputModeRadios = document.querySelectorAll('input[name="input-mode"]');
const singleVerseInput = document.getElementById('single-verse-input');
const rangeVerseInput = document.getElementById('range-verse-input');
const chapterInputDiv = document.getElementById('chapter-input');
const directInputDiv = document.getElementById('direct-input');
const directVerseInput = document.getElementById('direct-verse-input');
const startVerseInput = document.getElementById('start-verse');
const endVerseInput = document.getElementById('end-verse');

// 프레젠테이션 모드 요소들
const presentationMode = document.getElementById('presentation-mode');
const currentVerseText = document.getElementById('current-verse-text');
const currentVerseReference = document.getElementById('current-verse-reference');
const prevSlideBtn = document.getElementById('prev-slide');
const nextSlideBtn = document.getElementById('next-slide');
const exitPresentationBtn = document.getElementById('exit-presentation');
const slideCounter = document.getElementById('slide-counter');
const controlPanel = document.getElementById('control-panel');

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSavedSlides();
});

// 앱 초기화
function initializeApp() {
    generateSlidesBtn.addEventListener('click', handleUnifiedGeneration);
    clearSlidesBtn.addEventListener('click', clearAllSlides);
    startPresentationBtn.addEventListener('click', startPresentation);
    downloadPptBtn.addEventListener('click', downloadPowerPoint);
    
    // 프레젠테이션 컨트롤
    prevSlideBtn.addEventListener('click', previousSlide);
    nextSlideBtn.addEventListener('click', nextSlide);
    exitPresentationBtn.addEventListener('click', exitPresentation);
    
    // 입력 모드 변경 이벤트
    inputModeRadios.forEach(radio => {
        radio.addEventListener('change', toggleInputMode);
    });
    
    // PPT 색상 변경 이벤트
    bgColorInput.addEventListener('change', updateColorPreview);
    textColorInput.addEventListener('change', updateColorPreview);
    
    // 배경 타입 변경 이벤트
    backgroundTypeRadios.forEach(radio => {
        radio.addEventListener('change', toggleBackgroundType);
    });
    
    // 배경 이미지 업로드 이벤트
    bgImageInput.addEventListener('change', handleImageUpload);
    clearBgImageBtn.addEventListener('click', clearBackgroundImage);
    
    // 템플릿 이벤트
    saveTemplateBtn.addEventListener('click', saveTemplate);
    
    // 새로운 설정 이벤트
    textAlignRadios.forEach(radio => {
        radio.addEventListener('change', () => saveTemplate(false));
    });
    showReferenceCheckbox.addEventListener('change', () => saveTemplate(false));
    showVerseNumberCheckbox.addEventListener('change', () => saveTemplate(false));
    // 텍스트 너비 슬라이더 이벤트
    textWidthSlider.addEventListener('input', updateSizeDisplay);
    textWidthSlider.addEventListener('change', () => saveTemplate(false));
    textPositionRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            toggleVerticalPositionSetting();
            saveTemplate(false);
        });
    });
    
    // 세로 위치 슬라이더 이벤트
    verticalPositionSlider.addEventListener('input', updateSizeDisplay);
    verticalPositionSlider.addEventListener('change', () => saveTemplate(false));
    
    // 폰트 설정 이벤트
    fontFamilySelect.addEventListener('change', () => {
        updateFontPreview();
        saveTemplate(false);
    });
    fontWeightRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateFontPreview();
            saveTemplate(false);
        });
    });
    
    // 텍스트 크기 이벤트
    referenceSizeSlider.addEventListener('input', updateSizeDisplay);
    verseSizeSlider.addEventListener('input', updateSizeDisplay);
    lineSpacingSlider.addEventListener('input', updateSizeDisplay);
    charSpacingSlider.addEventListener('input', updateSizeDisplay);
    referenceSizeSlider.addEventListener('change', () => saveTemplate(false));
    verseSizeSlider.addEventListener('change', () => saveTemplate(false));
    lineSpacingSlider.addEventListener('change', () => saveTemplate(false));
    charSpacingSlider.addEventListener('change', () => saveTemplate(false));
    
    // 새 템플릿 저장 이벤트
    saveNewTemplateBtn.addEventListener('click', saveNewTemplate);
    templateNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveNewTemplate();
        }
    });
    
    // 키보드 이벤트
    document.addEventListener('keydown', handleKeyDown);
    
    // Ctrl+Enter로 슬라이드 생성
    document.addEventListener('keydown', async function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            await handleUnifiedGeneration();
        }
    });
    
    // 동적 성경 구조 이벤트 리스너
    bookSelect.addEventListener('change', populateChapters);
    chapterNumInput.addEventListener('change', populateVerses);
    
    // 직접입력 예시 클릭 이벤트
    document.querySelectorAll('.example-text').forEach(example => {
        example.addEventListener('click', function() {
            directVerseInput.value = this.textContent;
            directVerseInput.focus();
        });
    });
    
    // 초기 설정
    updateColorPreview();
    updateSizeDisplay(); // 크기 표시 업데이트
    toggleVerticalPositionSetting(); // 세로 위치 설정 토글
    updateFontPreview(); // 폰트 미리보기 업데이트
    loadSavedTemplate(); // 저장된 템플릿 불러오기
    updateTemplateList(); // 템플릿 목록 업데이트
    updateSlidesDisplay();
    
    // 동적 드롭다운 초기화
    initializeBibleStructure();
}

// 입력 모드 전환
function toggleInputMode() {
    const selectedMode = document.querySelector('input[name="input-mode"]:checked').value;
    
    // 모든 입력 그룹 숨기기
    singleVerseInput.classList.add('hidden');
    rangeVerseInput.classList.add('hidden');
    chapterInputDiv.classList.add('hidden');
    directInputDiv.classList.add('hidden');
    
    // 버튼 텍스트 업데이트
    if (selectedMode === 'single') {
        // 단일 구절 모드
        singleVerseInput.classList.remove('hidden');
        generateBtnText.textContent = '단일 구절 생성';
    } else if (selectedMode === 'range') {
        // 구간 구절 모드
        rangeVerseInput.classList.remove('hidden');
        generateBtnText.textContent = '구간 구절 생성';
    } else if (selectedMode === 'chapter') {
        // 장 전체 모드
        chapterInputDiv.classList.remove('hidden');
        generateBtnText.textContent = '장 전체 생성';
    } else if (selectedMode === 'direct') {
        // 직접 입력 모드
        directInputDiv.classList.remove('hidden');
        generateBtnText.textContent = '직접 입력 생성';
    }
    
    // 입력 필드 초기화
    clearInputs();
}

// 성경 데이터베이스 로드 함수
async function loadBibleDatabase() {
    if (bibleDatabase) {
        return bibleDatabase; // 이미 로드된 경우 캐시된 데이터 반환
    }
    
    try {
        // 타임아웃 설정으로 응답이 너무 오래 걸리면 중단
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃
        
        const response = await fetch('data/bible.json', {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        bibleDatabase = await response.json();
        console.log('[Bible] 데이터베이스 로드 완료');
        return bibleDatabase;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('[Bible] 로딩 타임아웃 - 네트워크가 느리거나 파일이 너무 큽니다.');
        } else {
            console.error('[Bible] 데이터베이스 로드 실패:', error);
        }
        
        // 기본 샘플 데이터 제공
        return {
            "창1:1": " 태초에 하나님이 천지를 창조하시니라",
            "창1:2": "땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 영은 수면 위에 운행하시니라",
            "요3:16": "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 저를 믿는 자마다 멸망치 않고 영생을 얻게 하려 하심이니라"
        };
    }
}

// 성경책 이름을 JSON 키 형식으로 변환
function getBookKey(bookName) {
    const bookMapping = {
        '창세기': '창',
        '출애굽기': '출',
        '레위기': '레',
        '민수기': '민',
        '신명기': '신',
        '여호수아': '수',
        '사사기': '삿',
        '룻기': '룻',
        '사무엘상': '삼상',
        '사무엘하': '삼하',
        '열왕기상': '왕상',
        '열왕기하': '왕하',
        '역대상': '대상',
        '역대하': '대하',
        '에스라': '스',
        '느헤미야': '느',
        '에스더': '에',
        '욥기': '욥',
        '시편': '시',
        '잠언': '잠',
        '전도서': '전',
        '아가': '아',
        '이사야': '사',
        '예레미야': '렘',
        '예레미야애가': '애',
        '에스겔': '겔',
        '다니엘': '단',
        '호세아': '호',
        '요엘': '욜',
        '아모스': '암',
        '오바댜': '옵',
        '요나': '욘',
        '미가': '미',
        '나훔': '나',
        '하박국': '합',
        '스바냐': '습',
        '학개': '학',
        '스가랴': '슥',
        '말라기': '말',
        '마태복음': '마',
        '마가복음': '막',
        '누가복음': '눅',
        '요한복음': '요',
        '사도행전': '행',
        '로마서': '롬',
        '고린도전서': '고전',
        '고린도후서': '고후',
        '갈라디아서': '갈',
        '에베소서': '엡',
        '빌립보서': '빌',
        '골로새서': '골',
        '데살로니가전서': '살전',
        '데살로니가후서': '살후',
        '디모데전서': '딤전',
        '디모데후서': '딤후',
        '디도서': '딛',
        '빌레몬서': '몬',
        '히브리서': '히',
        '야고보서': '약',
        '베드로전서': '벧전',
        '베드로후서': '벧후',
        '요한일서': '요일',
        '요한이서': '요이',
        '요한삼서': '요삼',
        '유다서': '유',
        '요한계시록': '계'
    };
    
    return bookMapping[bookName] || bookName;
}

// 구절 내용 자동 생성 함수 (전체 개역개정 성경)
async function generateVerseText(book, chapter, verse) {
    try {
        // 성경 데이터베이스 로드
        const bible = await loadBibleDatabase();
        
        if (!bible) {
            return `${book} ${chapter}:${verse} - 성경 데이터베이스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.`;
        }
        
        // 성경책 이름을 JSON 키 형식으로 변환
        const bookKey = getBookKey(book);
        
        // 구절 키 생성 (예: "창1:1")
        const verseKey = `${bookKey}${chapter}:${verse}`;
        
        // 구절 찾기
        if (bible[verseKey]) {
            const verseText = bible[verseKey].trim();
            return verseText;
        }
        
        // 구절을 찾을 수 없는 경우
        return `${book} ${chapter}:${verse} - 해당 구절을 찾을 수 없습니다. 성경책과 장절 번호를 확인해주세요.`;
        
    } catch (error) {
        console.error('[Bible] 구절 생성 중 오류:', error);
        return `${book} ${chapter}:${verse} - 구절을 불러오는 중 오류가 발생했습니다.`;
    }
}

// 디버깅용 함수 (개발자 도구에서 사용)
function testBibleLookup(book, chapter, verse) {
    console.log('=== 성경구절 테스트 시작 ===');
    generateVerseText(book, chapter, verse).then(result => {
        console.log('=== 테스트 결과 ===');
        console.log('결과:', result);
        console.log('=== 테스트 종료 ===');
    }).catch(error => {
        console.error('테스트 중 오류:', error);
    });
}

// 즉시 테스트 함수
async function immediateTest() {
    console.log('=== 즉시 테스트 시작 ===');
    try {
        const result1 = await generateVerseText('창세기', 1, 1);
        console.log('창세기 1:1 결과:', result1);
        
        const result2 = await generateVerseText('출애굽기', 2, 1);
        console.log('출애굽기 2:1 결과:', result2);
        
        // 데이터베이스 직접 접근 테스트
        const bible = await loadBibleDatabase();
        if (bible) {
            console.log('데이터베이스 로드됨, 출2:1 직접 확인:', bible['출2:1']);
            console.log('창1:1 직접 확인:', bible['창1:1']);
        }
    } catch (error) {
        console.error('즉시 테스트 오류:', error);
    }
    console.log('=== 즉시 테스트 종료 ===');
}

// 구절 내용 자동 생성 함수 (백업용 - 기존 코드)
function generateVerseTextFallback(book, chapter, verse) {
    // 기본 데이터베이스 (백업용)
    const verseDatabase = {
        '창세기': {
            1: {
                1: '태초에 하나님이 천지를 창조하시니라',
                27: '하나님이 자기 형상 곧 하나님의 형상대로 사람을 창조하시되 남자와 여자를 창조하시고'
            }
        },
        '시편': {
            1: {
                1: '복 있는 사람은 악인들의 꾀를 따르지 아니하며 죄인들의 길에 서지 아니하며 오만한 자들의 자리에 앉지 아니하고',
                2: '오직 여호와의 율법을 즐거워하여 그의 율법을 주야로 묵상하는도다',
                3: '그는 시냇가에 심은 나무가 철을 따라 열매를 맺으며 그 잎사귀가 마르지 아니함 같으니 그가 하는 모든 일이 다 형통하리로다'
            },
            23: {
                1: '여호와는 나의 목자시니 내게 부족함이 없으리로다',
                2: '그가 나를 푸른 풀밭에 누이시며 쉴 만한 물 가로 인도하시는도다',
                3: '내 영혼을 소생시키시고 자기 이름을 위하여 의의 길로 인도하시는도다',
                4: '내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라 주의 지팡이와 주의 막대기가 나를 안위하시나이다',
                5: '주께서 내 원수의 목전에서 내게 상을 차려 주시고 기름을 내 머리에 부으셨으니 내 잔이 넘치나이다',
                6: '내 평생에 선하심과 인자하심이 반드시 나를 따르리니 내가 여호와의 집에 영원히 살리로다'
            },
            46: {
                10: '이를 그치라 내가 하나님 됨을 알지어다 내가 뭇 나라 중에서 높임을 받으리라 내가 세계 중에서 높임을 받으리라 하시도다'
            },
            119: {
                105: '주의 말씀은 내 발에 등이요 내 길에 빛이니이다'
            }
        },
        '잠언': {
            3: {
                5: '너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라',
                6: '너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라'
            }
        },
        '이사야': {
            40: {
                31: '오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요 달음박질하여도 곤비하지 아니하겠고 걸어가도 피곤하지 아니하리로다'
            },
            41: {
                10: '두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와주리라 참으로 나의 의로운 오른손으로 너를 붙들리라'
            },
            55: {
                11: '내 입에서 나가는 말도 이와 같이 헛되이 내게로 돌아오지 아니하고 나의 기뻐하는 뜻을 이루며 내가 보낸 일에 형통함이니라'
            }
        },
        '예레미야': {
            29: {
                11: '여호와의 말씀이니라 너희를 향한 나의 생각을 내가 아나니 평안이요 재앙이 아니니라 너희에게 미래와 희망을 주는 것이니라'
            }
        },
        '마태복음': {
            5: {
                3: '심령이 가난한 자는 복이 있나니 천국이 그들의 것임이라',
                4: '애통하는 자는 복이 있나니 그들이 위로를 받을 것임이라',
                5: '온유한 자는 복이 있나니 그들이 땅을 기업으로 받을 것임이라',
                6: '의에 주리고 목마른 자는 복이 있나니 그들이 배부를 것임이라',
                7: '긍휼히 여기는 자는 복이 있나니 그들이 긍휼히 여김을 받을 것임이라',
                8: '마음이 청결한 자는 복이 있나니 그들이 하나님을 볼 것임이라',
                9: '화평하게 하는 자는 복이 있나니 그들이 하나님의 아들이라 일컬음을 받을 것임이라',
                10: '의를 위하여 박해를 받은 자는 복이 있나니 천국이 그들의 것임이라',
                11: '나로 말미암아 너희를 욕하고 박해하고 거짓으로 너희를 거슬러 모든 악한 말을 할 때에는 너희에게 복이 있나니',
                12: '기뻐하고 즐거워하라 하늘에서 너희의 상이 큼이라 너희 전에 있던 선지자들도 이같이 박해하였느니라'
            },
            6: {
                33: '그런즉 너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라'
            },
            11: {
                28: '수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라',
                29: '나는 마음이 온유하고 겸손하니 나의 멍에를 메고 내게 배우라 그리하면 너희 마음이 쉼을 얻으리니'
            },
            28: {
                19: '그러므로 너희는 가서 모든 민족을 제자로 삼아 아버지와 아들과 성령의 이름으로 세례를 베풀고',
                20: '내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라 볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라 하시니라'
            }
        },
        '마가복음': {
            16: {
                15: '또 이르시되 너희는 온 천하에 다니며 만민에게 복음을 전파하라'
            }
        },
        '누가복음': {
            2: {
                10: '천사가 이르되 무서워하지 말라 보라 내가 온 백성에게 미칠 큰 기쁨의 좋은 소식을 너희에게 전하노라',
                11: '오늘 다윗의 동네에 너희를 위하여 구주가 나셨으니 곧 그리스도 주시니라'
            }
        },
        '요한복음': {
            1: {
                1: '태초에 말씀이 계시니라 이 말씀이 하나님과 함께 계셨으니 이 말씀은 곧 하나님이시니라',
                14: '말씀이 육신이 되어 우리 가운데 거하시매 우리가 그의 영광을 보니 아버지의 독생자의 영광이요 은혜와 진리가 충만하더라'
            },
            3: {
                16: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라'
            },
            8: {
                32: '진리를 알지니 진리가 너희를 자유롭게 하리라'
            },
            14: {
                6: '예수께서 이르시되 내가 곧 길이요 진리요 생명이니 나로 말미암지 않고는 아버지께로 올 자가 없느니라'
            },
            15: {
                13: '사람이 친구를 위하여 자기 목숨을 버리면 이보다 더 큰 사랑이 없나니'
            }
        },
        '사도행전': {
            1: {
                8: '오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과 온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라 하시니라'
            }
        },
        '로마서': {
            1: {
                16: '내가 복음을 부끄러워하지 아니하노니 이 복음은 모든 믿는 자에게 구원을 주시는 하나님의 능력이 됨이라 먼저는 유대인에게요 그리고 헬라인에게로다'
            },
            3: {
                23: '모든 사람이 죄를 범하였으매 하나님의 영광에 이르지 못하더니'
            },
            5: {
                8: '우리가 아직 죄인 되었을 때에 그리스도께서 우리를 위하여 죽으심으로 하나님께서 우리에 대한 자기의 사랑을 확증하셨느니라'
            },
            6: {
                23: '죄의 삯은 사망이요 하나님의 은사는 그리스도 예수 우리 주 안에 있는 영생이니라'
            },
            8: {
                28: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라',
                29: '하나님이 미리 아신 자들을 또한 그 아들의 형상을 본받게 하기 위하여 미리 정하셨으니 이는 그로 많은 형제 중에서 맏아들이 되게 하려 하심이니라',
                30: '또 미리 정하신 그들을 또한 부르시고 부르신 그들을 또한 의롭다 하시고 의롭다 하신 그들을 또한 영화롭게 하셨느니라',
                31: '그런즉 이 일에 대하여 우리가 무엇이라 하리요 만일 하나님이 우리를 위하시면 누가 우리를 대적하리요',
                38: '내가 확신하노니 사망이나 생명이나 천사들이나 권세자들이나 현재 일이나 장래 일이나 능력이나',
                39: '높음이나 깊음이나 다른 어떤 피조물이라도 우리를 우리 주 그리스도 예수 안에 있는 하나님의 사랑에서 끊을 수 없으리라'
            },
            12: {
                2: '너희는 이 세대를 본받지 말고 오직 마음을 새롭게 함으로 변화를 받아 하나님의 선하시고 기뻐하시고 온전하신 뜻이 무엇인지 분별하도록 하라'
            }
        },
        '고린도전서': {
            10: {
                13: '사람이 감당할 시험 밖에는 너희가 당한 것이 없나니 오직 하나님은 미쁘사 너희가 감당하지 못할 시험 당함을 허락하지 아니하시고 시험 당할 즈음에 또한 피할 길을 내사 너희로 능히 감당하게 하시느니라'
            },
            13: {
                4: '사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며 사랑은 자랑하지 아니하며 교만하지 아니하며',
                5: '무례히 행하지 아니하며 자기의 유익을 구하지 아니하며 성내지 아니하며 악한 것을 생각하지 아니하며',
                6: '불의를 기뻐하지 아니하며 진리와 함께 기뻐하고',
                7: '모든 것을 참으며 모든 것을 믿으며 모든 것을 바라며 모든 것을 견디느니라',
                8: '사랑은 언제까지나 떨어지지 아니하되 예언도 폐하고 방언도 그치고 지식도 폐하리라',
                13: '그런즉 믿음, 소망, 사랑, 이 세 가지는 항상 있을 것인데 그 중의 제일은 사랑이라'
            }
        },
        '고린도후서': {
            5: {
                17: '그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다'
            }
        },
        '갈라디아서': {
            2: {
                20: '내가 그리스도와 함께 십자가에 못 박혔나니 그런즉 이제는 내가 사는 것이 아니요 오직 내 안에 그리스도께서 사시는 것이라 이제 내가 육체 가운데 사는 것은 나를 사랑하사 나를 위하여 자기 자신을 버리신 하나님의 아들을 믿는 믿음 안에서 사는 것이라'
            },
            5: {
                22: '오직 성령의 열매는 사랑과 희락과 화평과 오래 참음과 자비와 양선과 충성과',
                23: '온유와 절제니 이같은 것을 금지할 법이 없느니라'
            }
        },
        '에베소서': {
            2: {
                8: '너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라',
                9: '행위에서 난 것이 아니니 이는 누구든지 자랑하지 못하게 함이라'
            },
            4: {
                32: '서로 친절하게 하며 불쌍히 여기며 서로 용서하기를 하나님이 그리스도 안에서 너희를 용서하심과 같이 하라'
            },
            6: {
                11: '마귀의 간계를 능히 대적하기 위하여 하나님의 전신갑주를 입으라'
            }
        },
        '빌립보서': {
            1: {
                21: '이는 내게 사는 것이 그리스도니 죽는 것도 유익함이라'
            },
            2: {
                13: '너희 안에서 행하시는 이는 하나님이시니 자기의 기쁘신 뜻을 위하여 너희에게 소원을 두고 행하게 하시나니'
            },
            4: {
                4: '주 안에서 항상 기뻐하라 내가 다시 말하노니 기뻐하라',
                6: '아무것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라',
                7: '그리하면 모든 지각에 뛰어난 하나님의 평강이 그리스도 예수 안에서 너희 마음과 생각을 지키시리라',
                13: '내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라',
                19: '나의 하나님이 그리스도 예수 안에서 영광 가운데 그의 풍성한 대로 너희 모든 쓸 것을 채우시리라'
            }
        },
        '골로새서': {
            3: {
                23: '무엇을 하든지 마음을 다하여 주께 하듯 하고 사람에게 하듯 하지 말라'
            }
        },
        '디모데후서': {
            3: {
                16: '모든 성경은 하나님의 감동으로 된 것으로 교훈과 책망과 바르게 함과 의로 교육하기에 유익하니'
            }
        },
        '히브리서': {
            11: {
                1: '믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니'
            },
            12: {
                2: '믿음의 주요 또 온전하게 하시는 이인 예수를 바라보자 그는 그 앞에 있는 기쁨을 위하여 십자가를 참으사 부끄러움을 개의치 아니하시더니 하나님 보좌 우편에 앉으셨느니라'
            },
            13: {
                8: '예수 그리스도는 어제나 오늘이나 영원토록 동일하시니라'
            }
        },
        '야고보서': {
            1: {
                17: '온갖 좋은 은사와 온전한 선물이 다 위로부터 빛들의 아버지께로부터 내려오나니 그는 변함도 없으시고 회전하는 그림자도 없으시니라'
            }
        },
        '요한일서': {
            4: {
                7: '사랑하는 자들아 우리가 서로 사랑하자 사랑은 하나님께 속한 것이니 사랑하는 자마다 하나님으로부터 나서 하나님을 알고',
                8: '사랑하지 아니하는 자는 하나님을 알지 못하나니 이는 하나님은 사랑이심이라',
                16: '하나님이 우리를 사랑하시는 사랑을 우리가 알고 믿었노니 하나님은 사랑이시라 사랑 안에 거하는 자는 하나님 안에 거하고 하나님도 그의 안에 거하시느니라'
            }
        },
        '요한계시록': {
            21: {
                4: '모든 눈물을 그 눈에서 닦아 주시니 다시는 사망이 없고 애통하는 것이나 곡하는 것이나 아픈 것이 다시 있지 아니하리니 처음 것들이 다 지나갔음이러라'
            }
        }
    };
    
    // 데이터베이스에서 구절 찾기
    if (verseDatabase[book] && verseDatabase[book][chapter] && verseDatabase[book][chapter][verse]) {
        return verseDatabase[book][chapter][verse];
    }
    
    // 데이터가 없으면 기본 메시지 리턴
    return `${book} ${chapter}:${verse} - 이 구절은 아직 데이터베이스에 추가되지 않았습니다. 관리자에게 요청해 주세요.`;
}

// 단일 구절 자동 생성
async function addVerse() {
    const book = bookSelect.value.trim();
    const chapter = chapterNumInput.value.trim();
    const verse = verseInput.value.trim();
    
    // 입력 검증
    if (!book) {
        alert('성경책을 선택해주세요.');
        bookSelect.focus();
        return;
    }
    
    if (!chapter) {
        alert('장 번호를 입력해주세요.');
        chapterNumInput.focus();
        return;
    }
    
    if (!verse) {
        alert('절 번호를 입력해주세요.');
        verseInput.focus();
        return;
    }
    
    // 자동으로 구절 내용 생성 (전체 성경 데이터베이스)
    const text = await generateVerseText(book, parseInt(chapter), parseInt(verse));
    
    // 새 슬라이드 생성
    const newSlide = {
        id: Date.now(),
        book: book,
        chapter: parseInt(chapter),
        verse: parseInt(verse),
        text: text,
        reference: `${book} ${chapter}:${verse}`
    };
    
    // 슬라이드 배열에 추가
    slides.push(newSlide);
    
    // 입력 필드 초기화
    clearInputs();
    
    // 화면 업데이트
    updateSlidesDisplay();
    saveSlidesToStorage();
    
    // 성공 메시지
    showNotification(`슬라이드가 생성되었습니다! (${book} ${chapter}:${verse})`, 'success');
}

// 구간 구절 자동 생성
async function addVerseRange() {
    const book = bookSelect.value.trim();
    const chapter = chapterNumInput.value.trim();
    const startVerse = startVerseInput.value.trim();
    const endVerse = endVerseInput.value.trim();
    
    // 입력 검증
    if (!book) {
        alert('성경책을 선택해주세요.');
        bookSelect.focus();
        return;
    }
    
    if (!chapter) {
        alert('장 번호를 입력해주세요.');
        chapterNumInput.focus();
        return;
    }
    
    if (!startVerse) {
        alert('시작 절을 입력해주세요.');
        startVerseInput.focus();
        return;
    }
    
    if (!endVerse) {
        alert('끝 절을 입력해주세요.');
        endVerseInput.focus();
        return;
    }
    
    const startVerseNum = parseInt(startVerse);
    const endVerseNum = parseInt(endVerse);
    
    if (startVerseNum > endVerseNum) {
        alert('시작 절이 끝 절보다 클 수 없습니다.');
        startVerseInput.focus();
        return;
    }
    
    // 각 구절을 자동으로 생성
    let addedCount = 0;
    
    for (let currentVerse = startVerseNum; currentVerse <= endVerseNum; currentVerse++) {
        const text = await generateVerseText(book, parseInt(chapter), currentVerse);
        
        const newSlide = {
            id: Date.now() + currentVerse,
            book: book,
            chapter: parseInt(chapter),
            verse: currentVerse,
            text: text,
            reference: `${book} ${chapter}:${currentVerse}`
        };
        
        slides.push(newSlide);
        addedCount++;
    }
    
    // 입력 필드 초기화
    clearInputs();
    
    // 화면 업데이트
    updateSlidesDisplay();
    saveSlidesToStorage();
    
    // 성공 메시지
    showNotification(`${addedCount}개의 슬라이드가 생성되었습니다! (${book} ${chapter}:${startVerseNum}-${endVerseNum})`, 'success');
}

// 장 전체 구절 자동 생성
async function addChapterSlides() {
    const book = bookSelect.value.trim();
    const chapter = chapterNumInput.value.trim();
    
    // 입력 검증
    if (!book) {
        alert('성경책을 선택해주세요.');
        bookSelect.focus();
        return;
    }
    
    if (!chapter) {
        alert('장 번호를 입력해주세요.');
        chapterNumInput.focus();
        return;
    }
    
    try {
        // 로딩 상태 표시 (통합 버튼용)
        const originalText = generateSlidesBtn.innerHTML;
        generateSlidesBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 장 전체 생성 중...';
        generateSlidesBtn.disabled = true;
        
        showNotification(`${book} ${chapter}장의 모든 구절을 찾는 중입니다...`, 'info');
        
        // 성경 데이터베이스 로드
        const bible = await loadBibleDatabase();
        if (!bible) {
            throw new Error('성경 데이터베이스를 불러올 수 없습니다.');
        }
        
        // 해당 장의 모든 구절 키 찾기
        const bookKey = getBookKey(book);
        const chapterPattern = `${bookKey}${chapter}:`;
        
        const chapterVerses = Object.keys(bible)
            .filter(key => key.startsWith(chapterPattern))
            .map(key => {
                const verseNum = parseInt(key.split(':')[1]);
                return { key, verseNum, text: bible[key].trim() };
            })
            .sort((a, b) => a.verseNum - b.verseNum);
        
        if (chapterVerses.length === 0) {
            throw new Error(`${book} ${chapter}장을 찾을 수 없습니다. 성경책과 장 번호를 확인해주세요.`);
        }
        
        console.log(`[Bible] ${book} ${chapter}장에서 ${chapterVerses.length}개 구절 발견`);
        
        // 각 구절을 슬라이드로 추가
        let addedCount = 0;
        for (const verseData of chapterVerses) {
            const newSlide = {
                id: Date.now() + verseData.verseNum + Math.random(),
                book: book,
                chapter: parseInt(chapter),
                verse: verseData.verseNum,
                text: verseData.text,
                reference: `${book} ${chapter}:${verseData.verseNum}`
            };
            
            slides.push(newSlide);
            addedCount++;
        }
        
        // 입력 필드 초기화
        clearInputs();
        
        // 화면 업데이트
        updateSlidesDisplay();
        saveSlidesToStorage();
        
        // 성공 메시지
        showNotification(
            `${book} ${chapter}장 전체가 생성되었습니다! (${addedCount}개 구절)`, 
            'success'
        );
        
    } catch (error) {
        console.error('장 전체 생성 중 오류:', error);
        showNotification(error.message || '장 전체 생성 중 오류가 발생했습니다.', 'error');
    } finally {
        // 버튼 상태 복원 (통합 버튼용)
        generateSlidesBtn.innerHTML = originalText;
        generateSlidesBtn.disabled = false;
    }
}

// 입력 필드 초기화
function clearInputs() {
    chapterNumInput.value = '';
    verseInput.value = '';
    startVerseInput.value = '';
    endVerseInput.value = '';
    directVerseInput.value = '';
}

// 슬라이드 화면 업데이트
function updateSlidesDisplay() {
    if (slides.length === 0) {
        slidesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bible"></i>
                <p>아직 추가된 성경 구절이 없습니다.<br>위에서 구절을 입력하고 생성해보세요.</p>
            </div>
        `;
        startPresentationBtn.disabled = true;
        downloadPptBtn.disabled = true;
        return;
    }
    
    startPresentationBtn.disabled = false;
    downloadPptBtn.disabled = false;
    
    slidesContainer.innerHTML = slides.map((slide, index) => `
        <div class="slide-item" data-id="${slide.id}">
            <div class="slide-content-preview">
                <div class="slide-reference">${slide.reference}</div>
                <div class="slide-text-preview">${slide.text}</div>
            </div>
            <div class="slide-actions">
                <button class="btn-edit" onclick="editSlide(${slide.id})" title="편집">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteSlide(${slide.id})" title="삭제">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// 슬라이드 편집
function editSlide(slideId) {
    const slide = slides.find(s => s.id === slideId);
    if (!slide) return;
    
    // 입력 필드에 값 설정
    bookSelect.value = slide.book;
    chapterNumInput.value = slide.chapter;
    verseInput.value = slide.verse;
    
    // 단일 모드로 전환
    document.querySelector('input[name="input-mode"][value="single"]').checked = true;
    toggleInputMode();
    
    // 기존 슬라이드 삭제
    deleteSlide(slideId);
    
    // 포커스
    verseInput.focus();
    
    showNotification('편집을 위해 구절을 불러왔습니다.', 'info');
}

// 슬라이드 삭제
function deleteSlide(slideId) {
    if (confirm('이 구절을 삭제하시겠습니까?')) {
        slides = slides.filter(s => s.id !== slideId);
        updateSlidesDisplay();
        saveSlidesToStorage();
        showNotification('구절이 삭제되었습니다.', 'warning');
    }
}

// 모든 슬라이드 삭제
function clearAllSlides() {
    if (slides.length === 0) {
        showNotification('삭제할 구절이 없습니다.', 'info');
        return;
    }
    
    if (confirm(`모든 구절(${slides.length}개)을 삭제하시겠습니까?`)) {
        slides = [];
        updateSlidesDisplay();
        saveSlidesToStorage();
        showNotification('모든 구절이 삭제되었습니다.', 'warning');
    }
}

// 프레젠테이션 시작
function startPresentation() {
    if (slides.length === 0) {
        alert('프레젠테이션할 구절이 없습니다.');
        return;
    }
    
    currentSlideIndex = 0;
    presentationMode.classList.remove('hidden');
    controlPanel.style.display = 'none';
    
    // 사용자 선택 설정 적용
    const backgroundType = document.querySelector('input[name="background-type"]:checked').value;
    const backgroundColor = bgColorInput.value;
    const textColor = textColorInput.value;
    const backgroundImage = imagePreview.src;
    
    if (backgroundType === 'image' && backgroundImage) {
        // 배경 이미지 설정
        presentationMode.style.backgroundColor = '';
        presentationMode.style.backgroundImage = `url(${backgroundImage})`;
        presentationMode.style.backgroundSize = 'cover';
        presentationMode.style.backgroundPosition = 'center';
        presentationMode.style.backgroundRepeat = 'no-repeat';
    } else {
        // 배경색 설정
        presentationMode.style.backgroundImage = '';
        presentationMode.style.backgroundColor = backgroundColor;
    }
    
    currentVerseText.style.color = textColor;
    currentVerseReference.style.color = textColor;
    
    updatePresentationSlide();
    
    // 전체화면 요청 (선택사항)
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('전체화면 모드를 지원하지 않습니다.');
        });
    }
}

// 프레젠테이션 종료
function exitPresentation() {
    presentationMode.classList.add('hidden');
    controlPanel.style.display = 'block';
    
    // 전체화면 종료
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {
            console.log('전체화면 종료 중 오류가 발생했습니다.');
        });
    }
}

// 이전 슬라이드
function previousSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updatePresentationSlide();
    }
}

// 다음 슬라이드
function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        updatePresentationSlide();
    }
}

// 프레젠테이션 슬라이드 업데이트
function updatePresentationSlide() {
    if (slides.length === 0) return;
    
    const currentSlide = slides[currentSlideIndex];
    
    // 간단한 텍스트 정리 (PPT와 동일)
    const cleanText = currentSlide.text.replace(/\s+/g, ' ').trim();
    currentVerseText.textContent = cleanText;
    currentVerseReference.textContent = currentSlide.reference;
    
    // 네비게이션 버튼 상태 업데이트
    prevSlideBtn.disabled = currentSlideIndex === 0;
    nextSlideBtn.disabled = currentSlideIndex === slides.length - 1;
    
    // 슬라이드 카운터 업데이트
    slideCounter.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
}

// 키보드 이벤트 처리
function handleKeyDown(e) {
    if (!presentationMode.classList.contains('hidden')) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case 'PageDown':
            case ' ': // 스페이스바
                e.preventDefault();
                nextSlide();
                break;
            case 'Escape':
                e.preventDefault();
                exitPresentation();
                break;
            case 'Home':
                e.preventDefault();
                currentSlideIndex = 0;
                updatePresentationSlide();
                break;
            case 'End':
                e.preventDefault();
                currentSlideIndex = slides.length - 1;
                updatePresentationSlide();
                break;
        }
    }
}

// 로컬 스토리지에 저장
function saveSlidesToStorage() {
    try {
        localStorage.setItem('bible-slides', JSON.stringify(slides));
    } catch (error) {
        console.error('슬라이드 저장 중 오류가 발생했습니다:', error);
    }
}

// 로컬 스토리지에서 불러오기
function loadSavedSlides() {
    try {
        const saved = localStorage.getItem('bible-slides');
        if (saved) {
            slides = JSON.parse(saved);
            updateSlidesDisplay();
            
            if (slides.length > 0) {
                showNotification(`저장된 ${slides.length}개의 구절을 불러왔습니다.`, 'success');
            }
        }
    } catch (error) {
        console.error('슬라이드 불러오기 중 오류가 발생했습니다:', error);
        slides = [];
    }
}

// 알림 메시지 표시
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // 스타일 적용
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: getNotificationColor(type),
        color: '#ffffff',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '1rem',
        fontWeight: 'bold',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease-out'
    });
    
    // 애니메이션 CSS 추가 (한 번만)
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// 알림 아이콘 가져오기
function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'times-circle';
        default: return 'info-circle';
    }
}

// 알림 색상 가져오기
function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#28a745';
        case 'warning': return '#ffc107';
        case 'error': return '#dc3545';
        default: return '#007bff';
    }
}

// 샘플 데이터 추가 함수 (개발/테스트용)
function addSampleData() {
    const sampleVerses = [
        {
            book: '요한복음',
            chapter: 3,
            verse: 16,
            text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라'
        },
        {
            book: '빌립보서',
            chapter: 4,
            verse: 13,
            text: '내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라'
        }
    ];
    
    sampleVerses.forEach(verse => {
        const slide = {
            id: Date.now() + Math.random(),
            book: verse.book,
            chapter: verse.chapter,
            verse: verse.verse,
            text: verse.text,
            reference: `${verse.book} ${verse.chapter}:${verse.verse}`
        };
        slides.push(slide);
    });
    
    updateSlidesDisplay();
    saveSlidesToStorage();
    showNotification('샘플 구절이 추가되었습니다!', 'success');
}

// 통합된 슬라이드 생성 함수
async function handleUnifiedGeneration() {
    const selectedMode = document.querySelector('input[name="input-mode"]:checked').value;
    
    try {
        if (selectedMode === 'single') {
            await addVerse();
        } else if (selectedMode === 'range') {
            await addVerseRange();
        } else if (selectedMode === 'chapter') {
            await addChapterSlides();
        } else if (selectedMode === 'direct') {
            await addDirectInput();
        }
    } catch (error) {
        console.error('슬라이드 생성 중 오류:', error);
        showNotification('슬라이드 생성 중 오류가 발생했습니다.', 'error');
    }
}

// 색상 미리보기 업데이트
function updateColorPreview() {
    const bgColor = bgColorInput.value;
    const textColor = textColorInput.value;
    
    // 미리보기 업데이트
    bgPreview.style.backgroundColor = bgColor;
    textPreview.style.backgroundColor = textColor;
    
    // 템플릿 자동 저장
    saveTemplate(false); // false = 알림 없이 저장
}

// 배경 타입 전환
function toggleBackgroundType() {
    const selectedType = document.querySelector('input[name="background-type"]:checked').value;
    
    if (selectedType === 'color') {
        colorBackgroundSetting.classList.remove('hidden');
        imageBackgroundSetting.classList.add('hidden');
    } else {
        colorBackgroundSetting.classList.add('hidden');
        imageBackgroundSetting.classList.remove('hidden');
    }
    
    // 템플릿 자동 저장
    saveTemplate(false);
}

// 이미지 업로드 처리
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
    }
    
    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // 미리보기 표시
        imagePreview.src = e.target.result;
        imageName.textContent = file.name;
        imageSize.textContent = `크기: ${(file.size / 1024).toFixed(1)} KB`;
        imagePreviewContainer.classList.remove('hidden');
        
        // 템플릿 자동 저장
        saveTemplate(false);
        
        showNotification('배경 이미지가 업로드되었습니다.', 'success');
    };
    reader.readAsDataURL(file);
}

// 배경 이미지 제거
function clearBackgroundImage() {
    bgImageInput.value = '';
    imagePreviewContainer.classList.add('hidden');
    imagePreview.src = '';
    imageName.textContent = '';
    imageSize.textContent = '';
    
    // 템플릿 자동 저장
    saveTemplate(false);
    
    showNotification('배경 이미지가 제거되었습니다.', 'warning');
}

// 템플릿 저장 (기본 설정)
function saveTemplate(showAlert = true) {
    const template = getCurrentTemplate();
    
    try {
        localStorage.setItem('ppt-template', JSON.stringify(template));
        if (showAlert) {
            showNotification('기본 설정이 저장되었습니다.', 'success');
        }
    } catch (error) {
        console.error('템플릿 저장 중 오류:', error);
        if (showAlert) {
            showNotification('설정 저장 중 오류가 발생했습니다.', 'error');
        }
    }
}

// 기본 템플릿 불러오기
function loadTemplate() {
    try {
        const saved = localStorage.getItem('ppt-template');
        if (saved) {
            const template = JSON.parse(saved);
            applyTemplate(template);
            showNotification('기본 설정을 불러왔습니다.', 'success');
        } else {
            showNotification('저장된 기본 설정이 없습니다.', 'info');
        }
    } catch (error) {
        console.error('템플릿 불러오기 중 오류:', error);
        showNotification('설정 불러오기 중 오류가 발생했습니다.', 'error');
    }
}

// 자동 템플릿 불러오기 (앱 시작 시)
function loadSavedTemplate() {
    try {
        const saved = localStorage.getItem('ppt-template');
        if (saved) {
            const template = JSON.parse(saved);
            applyTemplate(template);
        }
    } catch (error) {
        console.error('자동 템플릿 불러오기 중 오류:', error);
    }
}

// 텍스트 자동 줄바꿈 함수 (읽기 쉽게 구절을 나눔)
function formatVerseText(text) {
    if (!text) return text;
    
    // 문장부호로 나누되, 너무 긴 문장은 추가로 나눔
    let formattedText = text;
    
    // 1. 마침표, 느낌표, 물음표 뒤에 줄바꿈
    formattedText = formattedText.replace(/([.!?])\s+/g, '$1\n');
    
    // 2. 쉼표나 세미콜론 뒤에서도 적절히 나눔 (40자 이상일 때)
    formattedText = formattedText.replace(/([,;])\s+/g, (match, punct, offset) => {
        const beforeText = formattedText.substring(0, offset);
        const lastNewline = beforeText.lastIndexOf('\n');
        const currentLineLength = offset - lastNewline - 1;
        
        if (currentLineLength > 40) {
            return punct + '\n';
        }
        return match;
    });
    
    // 3. 접속사나 부사구 앞에서 나눔
    const breakWords = ['그러나', '하지만', '그러므로', '따라서', '그리하여', '이는', '이에', '또한', '또', '그런데', '그리고', '오직'];
    breakWords.forEach(word => {
        const regex = new RegExp(`\\s+(${word})\\s+`, 'g');
        formattedText = formattedText.replace(regex, `\n$1 `);
    });
    
    // 4. 너무 긴 줄은 강제로 나눔 (60자 이상)
    const lines = formattedText.split('\n');
    const processedLines = [];
    
    lines.forEach(line => {
        if (line.length > 60) {
            // 적절한 위치에서 나누기 (공백 기준)
            const words = line.split(' ');
            let currentLine = '';
            
            words.forEach(word => {
                if ((currentLine + ' ' + word).length > 50) {
                    if (currentLine) {
                        processedLines.push(currentLine.trim());
                        currentLine = word;
                    } else {
                        processedLines.push(word);
                    }
                } else {
                    currentLine += (currentLine ? ' ' : '') + word;
                }
            });
            
            if (currentLine) {
                processedLines.push(currentLine.trim());
            }
        } else {
            processedLines.push(line);
        }
    });
    
    // 5. 빈 줄 제거 및 앞뒤 공백 정리
    return processedLines
        .filter(line => line.trim())
        .map(line => line.trim())
        .join('\n');
}

// 구절 텍스트에 절 번호 추가
function addVerseNumber(text, verseNumber) {
    const showVerseNumber = showVerseNumberCheckbox.checked;
    if (showVerseNumber) {
        return `${verseNumber}. ${text}`;
    }
    return text;
}

// 세로 위치 설정 토글
function toggleVerticalPositionSetting() {
    const selectedPosition = document.querySelector('input[name="text-position"]:checked').value;
    if (selectedPosition === 'bottom') {
        verticalPositionSetting.style.display = 'block';
    } else {
        verticalPositionSetting.style.display = 'none';
    }
}

// 폰트 미리보기 업데이트
function updateFontPreview() {
    const selectedFont = fontFamilySelect.value;
    const selectedWeight = document.querySelector('input[name="font-weight"]:checked').value;
    
    // 슬라이드 컨테이너의 모든 텍스트에 폰트 적용 (미리보기)
    const slideItems = document.querySelectorAll('.slide-item');
    slideItems.forEach(item => {
        item.style.fontFamily = selectedFont;
        item.style.fontWeight = selectedWeight;
    });
    
    // 폰트 선택기 자체에도 선택된 폰트 적용
    fontFamilySelect.style.fontFamily = selectedFont;
    fontFamilySelect.style.fontWeight = selectedWeight;
}

// 텍스트 크기 표시 업데이트
function updateSizeDisplay() {
    referenceSizeValue.textContent = referenceSizeSlider.value + 'pt';
    verseSizeValue.textContent = verseSizeSlider.value + 'pt';
    lineSpacingValue.textContent = lineSpacingSlider.value + '%';
    charSpacingValue.textContent = charSpacingSlider.value + 'pt';
    textWidthValue.textContent = textWidthSlider.value + '%';
    verticalPositionValue.textContent = verticalPositionSlider.value + '%';
}

// 새 템플릿 저장
function saveNewTemplate() {
    const templateName = templateNameInput.value.trim();
    if (!templateName) {
        alert('템플릿 이름을 입력해주세요.');
        templateNameInput.focus();
        return;
    }
    
    // 중복 이름 확인
    const existingTemplates = getTemplateList();
    if (existingTemplates.find(t => t.name === templateName)) {
        if (!confirm('같은 이름의 템플릿이 있습니다. 덮어쓰시겠습니까?')) {
            return;
        }
    }
    
    const template = getCurrentTemplate();
    template.name = templateName;
    template.createdAt = new Date().toISOString();
    
    // 템플릿 목록에 저장
    const templates = existingTemplates.filter(t => t.name !== templateName);
    templates.push(template);
    
    try {
        localStorage.setItem('ppt-templates', JSON.stringify(templates));
        templateNameInput.value = '';
        updateTemplateList();
        showNotification(`템플릿 '${templateName}'이 저장되었습니다.`, 'success');
    } catch (error) {
        console.error('템플릿 저장 중 오류:', error);
        showNotification('템플릿 저장 중 오류가 발생했습니다.', 'error');
    }
}

// 현재 설정을 템플릿 객체로 반환
function getCurrentTemplate() {
    return {
        backgroundType: document.querySelector('input[name="background-type"]:checked').value,
        backgroundColor: bgColorInput.value,
        textColor: textColorInput.value,
        backgroundImage: imagePreview.src || null,
        backgroundImageName: imageName.textContent || null,
        backgroundImageSize: imageSize.textContent || null,
        textAlign: document.querySelector('input[name="text-align"]:checked').value,
        showReference: showReferenceCheckbox.checked,
        showVerseNumber: showVerseNumberCheckbox.checked,
        textWidth: parseInt(textWidthSlider.value),
        textPosition: document.querySelector('input[name="text-position"]:checked').value,
        verticalPosition: parseInt(verticalPositionSlider.value),
        referenceSize: parseInt(referenceSizeSlider.value),
        verseSize: parseInt(verseSizeSlider.value),
        lineSpacing: parseInt(lineSpacingSlider.value),
        charSpacing: parseInt(charSpacingSlider.value),
        fontFamily: fontFamilySelect.value,
        fontWeight: document.querySelector('input[name="font-weight"]:checked').value
    };
}

// 템플릿 목록 가져오기
function getTemplateList() {
    try {
        const saved = localStorage.getItem('ppt-templates');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('템플릿 목록 불러오기 중 오류:', error);
        return [];
    }
}

// 템플릿 목록 업데이트
function updateTemplateList() {
    const templates = getTemplateList();
    
    if (templates.length === 0) {
        templateList.innerHTML = '<div class="empty-templates">저장된 템플릿이 없습니다.</div>';
        return;
    }
    
    templateList.innerHTML = templates
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(template => `
            <div class="template-item" data-name="${template.name}">
                <div class="template-name" onclick="loadTemplateByName('${template.name}')">
                    ${template.name}
                </div>
                <div class="template-date">
                    ${new Date(template.createdAt).toLocaleDateString()}
                </div>
                <div class="template-actions">
                    <button class="btn-template-load" onclick="loadTemplateByName('${template.name}')" title="불러오기">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn-template-delete" onclick="deleteTemplate('${template.name}')" title="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
}

// 이름으로 템플릿 불러오기
function loadTemplateByName(templateName) {
    const templates = getTemplateList();
    const template = templates.find(t => t.name === templateName);
    
    if (!template) {
        showNotification('템플릿을 찾을 수 없습니다.', 'error');
        return;
    }
    
    applyTemplate(template);
    showNotification(`템플릿 '${templateName}'을 불러왔습니다.`, 'success');
}

// 템플릿 삭제
function deleteTemplate(templateName) {
    if (!confirm(`템플릿 '${templateName}'을 삭제하시겠습니까?`)) {
        return;
    }
    
    try {
        const templates = getTemplateList();
        const updatedTemplates = templates.filter(t => t.name !== templateName);
        
        localStorage.setItem('ppt-templates', JSON.stringify(updatedTemplates));
        updateTemplateList();
        showNotification(`템플릿 '${templateName}'이 삭제되었습니다.`, 'warning');
    } catch (error) {
        console.error('템플릿 삭제 중 오류:', error);
        showNotification('템플릿 삭제 중 오류가 발생했습니다.', 'error');
    }
}

// 템플릿 적용
function applyTemplate(template) {
    // 배경 타입 설정
    const backgroundTypeRadio = document.querySelector(`input[name="background-type"][value="${template.backgroundType}"]`);
    if (backgroundTypeRadio) {
        backgroundTypeRadio.checked = true;
        toggleBackgroundType();
    }
    
    // 색상 설정
    bgColorInput.value = template.backgroundColor || '#000000';
    textColorInput.value = template.textColor || '#ffffff';
    updateColorPreview();
    
    // 배경 이미지 설정
    if (template.backgroundImage && template.backgroundType === 'image') {
        imagePreview.src = template.backgroundImage;
        imageName.textContent = template.backgroundImageName || '';
        imageSize.textContent = template.backgroundImageSize || '';
        imagePreviewContainer.classList.remove('hidden');
    }
    
    // 새로운 설정들 적용
    if (template.textAlign) {
        const textAlignRadio = document.querySelector(`input[name="text-align"][value="${template.textAlign}"]`);
        if (textAlignRadio) textAlignRadio.checked = true;
    }
    
    if (template.hasOwnProperty('showReference')) {
        showReferenceCheckbox.checked = template.showReference;
    }
    
    if (template.hasOwnProperty('showVerseNumber')) {
        showVerseNumberCheckbox.checked = template.showVerseNumber;
    }
    
    if (template.hasOwnProperty('textWidth')) {
        textWidthSlider.value = template.textWidth || 90;
    }
    
    if (template.textPosition) {
        const textPositionRadio = document.querySelector(`input[name="text-position"][value="${template.textPosition}"]`);
        if (textPositionRadio) textPositionRadio.checked = true;
    }
    
    // 텍스트 크기 설정
    if (template.referenceSize) {
        referenceSizeSlider.value = template.referenceSize;
    }
    
    if (template.verseSize) {
        verseSizeSlider.value = template.verseSize;
    }
    
    // 줄간격 설정
    if (template.lineSpacing) {
        lineSpacingSlider.value = template.lineSpacing;
    }
    
    // 자간 설정
    if (template.hasOwnProperty('charSpacing')) {
        charSpacingSlider.value = template.charSpacing;
    }
    
    // 세로 위치 설정
    if (template.verticalPosition) {
        verticalPositionSlider.value = template.verticalPosition;
    }
    
    // 폰트 설정
    if (template.fontFamily) {
        fontFamilySelect.value = template.fontFamily;
    }
    
    if (template.fontWeight) {
        const fontWeightRadio = document.querySelector(`input[name="font-weight"][value="${template.fontWeight}"]`);
        if (fontWeightRadio) fontWeightRadio.checked = true;
    }
    
    updateSizeDisplay();
    toggleVerticalPositionSetting();
    updateFontPreview();
}

// 구간 구절 샘플 데이터 추가 함수 (자동 생성)
function addSampleRangeData() {
    // 로마서 8:28-31 샘플 자동 생성
    bookSelect.value = '로마서';
    chapterInput.value = '8';
    startVerseInput.value = '28';
    endVerseInput.value = '31';
    
    // 구간 모드로 전환
    document.querySelector('input[name="input-mode"][value="range"]').checked = true;
    toggleInputMode();
    
    // 자동 생성 실행
    addVerseRange();
}

// PPT 다운로드 함수
async function downloadPowerPoint() {
    if (slides.length === 0) {
        alert('다운로드할 슬라이드가 없습니다.');
        return;
    }
    
    // 로딩 상태 표시
    const originalText = '<i class="fas fa-download"></i> PPT 다운로드';
    downloadPptBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 생성중...';
    downloadPptBtn.disabled = true;
    
    try {
        
        // PowerPoint 프레젠테이션 생성
        let pptx = new PptxGenJS();
        
        // 프레젠테이션 속성 설정
        pptx.author = '성경구절 PPT 생성기';
        pptx.company = '개역개정 성경';
        pptx.revision = '1';
        pptx.subject = '성경구절 프레젠테이션';
        pptx.title = '성경구절 슬라이드';
        
        // 사용자 선택 설정 가져오기
        const backgroundType = document.querySelector('input[name="background-type"]:checked').value;
        const backgroundColor = bgColorInput.value.replace('#', '');
        const textColor = textColorInput.value.replace('#', '');
        const backgroundImage = imagePreview.src;
        
        // 레이아웃 설정 가져오기
        const textAlign = document.querySelector('input[name="text-align"]:checked').value;
        const showReference = showReferenceCheckbox.checked;
        const showVerseNumber = showVerseNumberCheckbox.checked;
        const textWidthPercent = parseInt(textWidthSlider.value);
        const textPosition = document.querySelector('input[name="text-position"]:checked').value;
        const verticalPosition = parseInt(verticalPositionSlider.value);
        
        // 폰트 설정 가져오기
        const selectedFont = fontFamilySelect.value;
        const selectedWeight = document.querySelector('input[name="font-weight"]:checked').value;
        const isBold = selectedWeight !== 'normal';
        
        // 텍스트 영역 크기 계산
        const getTextDimensions = () => {
            const width = textWidthPercent + '%';
            let x;
            
            // 위치 설정
            switch(textPosition) {
                case 'left': 
                    x = '0%'; 
                    break;
                case 'center': 
                    x = ((100 - textWidthPercent) / 2) + '%';
                    break;
                case 'right': 
                    x = (100 - textWidthPercent) + '%';
                    break;
                default: 
                    x = '0%';
            }
            
            return { width, x };
        };
        
        const dimensions = getTextDimensions();
        
        // 각 슬라이드 생성
        slides.forEach((slide, index) => {
            let pptSlide = pptx.addSlide();
            
            // 배경 설정
            if (backgroundType === 'image' && backgroundImage) {
                pptSlide.background = { data: backgroundImage };
            } else {
                pptSlide.background = { color: backgroundColor };
            }
            
            // 세로 위치 계산
            let currentY;
            if (textPosition === 'bottom') {
                currentY = verticalPosition + '%';
            } else if (textPosition === 'top') {
                currentY = '10%';
            } else {
                currentY = '20%'; // center, left, right의 기본 중앙 위치
            }
            
            // 사용자 선택 텍스트 크기 및 줄간격, 자간 가져오기
            const referenceSize = parseInt(referenceSizeSlider.value);
            const verseSize = parseInt(verseSizeSlider.value);
            const lineSpacing = parseInt(lineSpacingSlider.value);
            const charSpacing = parseInt(charSpacingSlider.value);
            
            // 성경 참조 추가 (옵션에 따라)
            if (showReference) {
                pptSlide.addText(slide.reference, {
                    x: dimensions.x,
                    y: currentY,
                    w: dimensions.width,
                    h: '12%',
                    fontSize: referenceSize,
                    color: 'FFFF00',
                    align: textAlign,
                    valign: 'middle',
                    bold: isBold,
                    fontFace: selectedFont,
                    charSpacing: charSpacing
                });
                // 참조 표시 후 구절 위치 조정
                if (textPosition === 'bottom') {
                    currentY = (verticalPosition + 15) + '%'; // 참조 아래 15% 추가
                } else if (textPosition === 'top') {
                    currentY = '25%'; // 상단 참조 아래
                } else {
                    currentY = '35%'; // 중앙, 왼쪽, 오른쪽
                }
            }
            
            // 구절 텍스트 준비 (절 번호 추가 여부)
            let verseText = slide.text.replace(/\s+/g, ' ').trim();
            if (showVerseNumber) {
                verseText = `${slide.verse}. ${verseText}`;
            }
            
            // 구절 텍스트 추가
            pptSlide.addText(verseText, {
                x: dimensions.x,
                y: currentY,
                w: dimensions.width,
                h: showReference ? '50%' : '60%',
                fontSize: verseSize,
                color: textColor,
                align: textAlign,
                valign: 'middle',
                wrap: true,
                bold: isBold,
                fontFace: selectedFont,
                lineSpacing: lineSpacing,
                charSpacing: charSpacing
            });
        });
        
        // 파일명 생성
        const now = new Date();
        const timestamp = now.getFullYear() + 
            String(now.getMonth() + 1).padStart(2, '0') + 
            String(now.getDate()).padStart(2, '0') + '_' +
            String(now.getHours()).padStart(2, '0') + 
            String(now.getMinutes()).padStart(2, '0');
        
        const fileName = `성경구절_${slides.length}개_${timestamp}.pptx`;
        
        // 파일 다운로드
        await pptx.writeFile({ fileName: fileName });
        
        // 성공 메시지
        showNotification(`PPT 파일이 다운로드되었습니다! (${fileName})`, 'success');
        
    } catch (error) {
        console.error('PPT 생성 중 오류:', error);
        showNotification('PPT 생성 중 오류가 발생했습니다.', 'error');
    } finally {
        // 버튼 상태 복원
        downloadPptBtn.innerHTML = originalText;
        downloadPptBtn.disabled = false;
    }
}

// 개발자 도구에서 사용할 수 있는 함수들을 전역으로 노출
window.addSampleData = addSampleData;
window.addSampleRangeData = addSampleRangeData;
window.generateVerseText = generateVerseText;
window.testBibleLookup = testBibleLookup;
window.downloadPowerPoint = downloadPowerPoint;

// 직접입력 테스트 함수
window.testDirectInput = function() {
    console.log('=== 직접입력 테스트 시작 ===');
    
    // 직접입력 모드로 전환
    document.querySelector('input[name="input-mode"][value="direct"]').checked = true;
    toggleInputMode();
    
    // 테스트 케이스들
    const testCases = [
        '창 1:1',       // 단일 구절
        '요 3:16',      // 단일 구절
        '창 1:1~3',     // 구간 구절 (~)
        '시 23:1-6',    // 구간 구절 (-)
        '롬 8:28~31'    // 구간 구절
    ];
    
    testCases.forEach((testCase, index) => {
        setTimeout(() => {
            console.log(`테스트 ${index + 1}: "${testCase}" 파싱 시도`);
            try {
                const parsed = parseDirectInput(testCase);
                console.log(`✅ 성공:`, parsed);
            } catch (error) {
                console.log(`❌ 실패:`, error.message);
            }
        }, index * 100);
    });
    
    setTimeout(() => {
        console.log('=== 직접입력 테스트 완료 ===');
    }, testCases.length * 100 + 200);
};

// 동적 드롭다운 테스트 함수
window.testDynamicDropdowns = function() {
    console.log('=== 동적 드롭다운 테스트 시작 ===');
    
    // 테스트 케이스 1: 요한복음 (21장)
    console.log('테스트 1: 요한복음 선택');
    bookSelect.value = '요한복음';
    populateChapters();
    
    setTimeout(() => {
        // 3장 선택
        const chapterSelect = document.getElementById('chapter-select');
        if (chapterSelect) {
            chapterSelect.value = '3';
            chapterNumInput.value = '3';
            populateVerses();
            console.log('요한복음 3장 (36절) 로드 완료');
        }
        
        setTimeout(() => {
            // 테스트 케이스 2: 시편 (150장)
            console.log('테스트 2: 시편 선택');
            bookSelect.value = '시편';
            populateChapters();
            
            setTimeout(() => {
                // 119장 선택 (가장 긴 장)
                const chapterSelect = document.getElementById('chapter-select');
                if (chapterSelect) {
                    chapterSelect.value = '119';
                    chapterNumInput.value = '119';
                    populateVerses();
                    console.log('시편 119장 (176절) 로드 완료');
                }
                
                setTimeout(() => {
                    // 테스트 케이스 3: 오바댜 (1장만 있는 책)
                    console.log('테스트 3: 오바댜 선택');
                    bookSelect.value = '오바댜';
                    populateChapters();
                    
                    setTimeout(() => {
                        const chapterSelect = document.getElementById('chapter-select');
                        if (chapterSelect) {
                            chapterSelect.value = '1';
                            chapterNumInput.value = '1';
                            populateVerses();
                            console.log('오바댜 1장 (21절) 로드 완료');
                        }
                        console.log('=== 동적 드롭다운 테스트 완료 ===');
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }, 500);
};

// 템플릿 관리 함수들을 전역으로 노출
window.loadTemplateByName = loadTemplateByName;
window.deleteTemplate = deleteTemplate;

// ==================== 동적 성경 구조 관리 ====================

// ==================== 동적 성경 구조 관리 ====================

// 선택된 성경책의 장 목록 생성
function populateChapters() {
    const selectedBook = bookSelect.value;
    
    if (!selectedBook || !bibleStructure[selectedBook]) {
        console.log('선택된 성경책:', selectedBook, '구조 정보 없음');
        return;
    }
    
    const bookInfo = bibleStructure[selectedBook];
    const totalChapters = bookInfo.chapters;
    
    // 기존 장 번호 입력 필드를 드롭다운으로 변경
    let chapterSelect = document.getElementById('chapter-select');
    
    // 드롭다운이 없으면 생성
    if (!chapterSelect) {
        // 기존 input 요소 숨기기
        chapterNumInput.style.display = 'none';
        
        // 새 select 요소 생성
        chapterSelect = document.createElement('select');
        chapterSelect.id = 'chapter-select';
        chapterSelect.className = 'form-select';
        
        // 기존 input 다음에 삽입
        chapterNumInput.parentNode.insertBefore(chapterSelect, chapterNumInput.nextSibling);
        
        // 이벤트 리스너 추가
        chapterSelect.addEventListener('change', function() {
            // 원본 input에 값 동기화
            chapterNumInput.value = this.value;
            // 절 목록 업데이트
            populateVerses();
        });
    }
    
    // 기존 옵션 모두 제거
    chapterSelect.innerHTML = '';
    
    // 기본 옵션 추가
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '장 선택';
    chapterSelect.appendChild(defaultOption);
    
    // 장 옵션들 추가
    for (let chapter = 1; chapter <= totalChapters; chapter++) {
        const option = document.createElement('option');
        option.value = chapter;
        option.textContent = `${chapter}장`;
        chapterSelect.appendChild(option);
    }
    
    console.log(`${selectedBook}의 ${totalChapters}개 장이 로드되었습니다.`);
    
    // 절 드롭다운 초기화
    const verseSelects = ['verse-select', 'start-verse-select', 'end-verse-select'];
    verseSelects.forEach(selectId => {
        const verseSelect = document.getElementById(selectId);
        if (verseSelect) {
            verseSelect.innerHTML = '<option value="">절 선택</option>';
        }
    });
}

// 동적 성경 구조 초기화
function initializeBibleStructure() {
    // 기본값으로 창세기 선택
    bookSelect.value = '창세기';
    
    // 장 목록 생성
    populateChapters();
    
    // 기본값으로 1장 선택
    const chapterSelect = document.getElementById('chapter-select');
    if (chapterSelect) {
        chapterSelect.value = '1';
        chapterNumInput.value = '1';
        populateVerses();
    }
    
    console.log('성경 구조 초기화 완료: 창세기 1장');
}

// ==================== 직접 입력 기능 ====================

// 직접입력 처리 함수
async function addDirectInput() {
    const inputText = directVerseInput.value.trim();
    
    if (!inputText) {
        alert('성경 구절을 입력해주세요.');
        directVerseInput.focus();
        return;
    }
    
    try {
        const parsedInput = parseDirectInput(inputText);
        
        if (parsedInput.type === 'single') {
            // 단일 구절 처리
            await processSingleVerse(parsedInput);
        } else if (parsedInput.type === 'range') {
            // 구간 구절 처리
            await processRangeVerse(parsedInput);
        } else {
            throw new Error('올바른 형식이 아닙니다.');
        }
        
        // 입력 필드 초기화
        directVerseInput.value = '';
        
    } catch (error) {
        console.error('직접입력 처리 중 오류:', error);
        alert(`입력 오류: ${error.message}\n\n올바른 형식:\n- 단일 구절: 창 1:1\n- 구간 구절: 창 1:1~4 또는 창 1:1-4`);
    }
}

// 직접입력 파싱 함수
function parseDirectInput(input) {
    // 공백 정리
    input = input.trim().replace(/\s+/g, ' ');
    
    // 성경책 약어 매핑
    const bookAbbreviations = {
        '창': '창세기', '출': '출애굽기', '레': '레위기', '민': '민수기', '신': '신명기',
        '수': '여호수아', '삿': '사사기', '룻': '룻기', '삼상': '사무엘상', '삼하': '사무엘하',
        '왕상': '열왕기상', '왕하': '열왕기하', '대상': '역대상', '대하': '역대하', 
        '스': '에스라', '느': '느헤미야', '에': '에스더', '욥': '욥기', '시': '시편',
        '잠': '잠언', '전': '전도서', '아': '아가', '사': '이사야', '렘': '예레미야',
        '애': '예레미야애가', '겔': '에스겔', '단': '다니엘', '호': '호세아', '욜': '요엘',
        '암': '아모스', '옵': '오바댜', '욘': '요나', '미': '미가', '나': '나훔', '합': '하박국',
        '습': '스바냐', '학': '학개', '슥': '스가랴', '말': '말라기',
        '마': '마태복음', '막': '마가복음', '눅': '누가복음', '요': '요한복음', '행': '사도행전',
        '롬': '로마서', '고전': '고린도전서', '고후': '고린도후서', '갈': '갈라디아서',
        '엡': '에베소서', '빌': '빌립보서', '골': '골로새서', '살전': '데살로니가전서',
        '살후': '데살로니가후서', '딤전': '디모데전서', '딤후': '디모데후서', '딛': '디도서',
        '몬': '빌레몬서', '히': '히브리서', '약': '야고보서', '벧전': '베드로전서',
        '벧후': '베드로후서', '요일': '요한일서', '요이': '요한이서', '요삼': '요한삼서',
        '유': '유다서', '계': '요한계시록'
    };
    
    // 구간 구절 패턴 체크 (~ 또는 - 사용)
    const rangePattern = /^(.+?)\s*(\d+):(\d+)[\s~-]+(\d+)$/;
    const rangeMatch = input.match(rangePattern);
    
    if (rangeMatch) {
        const bookAbbr = rangeMatch[1].trim();
        const fullBookName = bookAbbreviations[bookAbbr] || bookAbbr;
        const chapter = parseInt(rangeMatch[2]);
        const startVerse = parseInt(rangeMatch[3]);
        const endVerse = parseInt(rangeMatch[4]);
        
        // 유효성 검사
        if (!bibleStructure[fullBookName]) {
            throw new Error(`'${bookAbbr}' 성경책을 찾을 수 없습니다.`);
        }
        
        if (startVerse >= endVerse) {
            throw new Error('시작 절은 끝 절보다 작아야 합니다.');
        }
        
        const maxVerse = bibleStructure[fullBookName].verses[chapter];
        if (!maxVerse || endVerse > maxVerse) {
            throw new Error(`${fullBookName} ${chapter}장은 ${maxVerse || 0}절까지만 있습니다.`);
        }
        
        return {
            type: 'range',
            book: fullBookName,
            chapter: chapter,
            startVerse: startVerse,
            endVerse: endVerse
        };
    }
    
    // 단일 구절 패턴 체크
    const singlePattern = /^(.+?)\s*(\d+):(\d+)$/;
    const singleMatch = input.match(singlePattern);
    
    if (singleMatch) {
        const bookAbbr = singleMatch[1].trim();
        const fullBookName = bookAbbreviations[bookAbbr] || bookAbbr;
        const chapter = parseInt(singleMatch[2]);
        const verse = parseInt(singleMatch[3]);
        
        // 유효성 검사
        if (!bibleStructure[fullBookName]) {
            throw new Error(`'${bookAbbr}' 성경책을 찾을 수 없습니다.`);
        }
        
        const maxVerse = bibleStructure[fullBookName].verses[chapter];
        if (!maxVerse || verse > maxVerse) {
            throw new Error(`${fullBookName} ${chapter}장은 ${maxVerse || 0}절까지만 있습니다.`);
        }
        
        return {
            type: 'single',
            book: fullBookName,
            chapter: chapter,
            verse: verse
        };
    }
    
    throw new Error('올바른 형식이 아닙니다.');
}

// 단일 구절 처리
async function processSingleVerse(parsed) {
    const { book, chapter, verse } = parsed;
    
    // 성경 데이터베이스 로드
    const database = await loadBibleDatabase();
    const verseKey = `${book}${chapter}:${verse}`;
    const verseText = database[verseKey];
    
    if (!verseText) {
        throw new Error(`${book} ${chapter}:${verse} 구절을 찾을 수 없습니다.`);
    }
    
    // 슬라이드 생성
    const slide = {
        id: Date.now() + Math.random(),
        book: book,
        chapter: chapter,
        verse: verse,
        text: verseText,
        reference: `${book} ${chapter}:${verse}`
    };
    
    slides.push(slide);
    updateSlidesDisplay();
    saveSlidesToStorage();
    
    showNotification(`슬라이드가 생성되었습니다! (${slide.reference})`, 'success');
}

// 구간 구절 처리
async function processRangeVerse(parsed) {
    const { book, chapter, startVerse, endVerse } = parsed;
    
    // 성경 데이터베이스 로드
    const database = await loadBibleDatabase();
    let createdCount = 0;
    
    // 로딩 상태 표시
    const originalText = generateBtnText.textContent;
    generateBtnText.textContent = '생성중...';
    generateSlidesBtn.disabled = true;
    
    try {
        for (let verse = startVerse; verse <= endVerse; verse++) {
            const verseKey = `${book}${chapter}:${verse}`;
            const verseText = database[verseKey];
            
            if (verseText) {
                const slide = {
                    id: Date.now() + Math.random() + verse,
                    book: book,
                    chapter: chapter,
                    verse: verse,
                    text: verseText,
                    reference: `${book} ${chapter}:${verse}`
                };
                
                slides.push(slide);
                createdCount++;
            } else {
                console.warn(`${book} ${chapter}:${verse} 구절을 찾을 수 없습니다.`);
            }
        }
        
        updateSlidesDisplay();
        saveSlidesToStorage();
        
        if (createdCount > 0) {
            showNotification(`${createdCount}개의 슬라이드가 생성되었습니다! (${book} ${chapter}:${startVerse}~${endVerse})`, 'success');
        } else {
            throw new Error('구절을 찾을 수 없습니다.');
        }
        
    } finally {
        // 버튼 상태 복원
        generateBtnText.textContent = originalText;
        generateSlidesBtn.disabled = false;
    }
}

// 선택된 성경책과 장의 절 목록 생성
function populateVerses() {
    const selectedBook = bookSelect.value;
    const selectedChapter = parseInt(chapterNumInput.value);
    
    if (!selectedBook || !selectedChapter || !bibleStructure[selectedBook]) {
        console.log('성경책 또는 장 정보가 부족합니다:', selectedBook, selectedChapter);
        return;
    }
    
    const bookInfo = bibleStructure[selectedBook];
    const totalVerses = bookInfo.verses[selectedChapter];
    
    if (!totalVerses) {
        console.log(`${selectedBook} ${selectedChapter}장의 절 정보를 찾을 수 없습니다.`);
        return;
    }
    
    // 단일 구절 모드 드롭다운 업데이트
    updateVerseDropdown('verse-select', 'verse', totalVerses, selectedBook, selectedChapter);
    
    // 구간 모드 드롭다운들도 업데이트
    updateVerseDropdown('start-verse-select', 'start-verse', totalVerses, selectedBook, selectedChapter);
    updateVerseDropdown('end-verse-select', 'end-verse', totalVerses, selectedBook, selectedChapter);
    
    console.log(`${selectedBook} ${selectedChapter}장의 ${totalVerses}개 절이 로드되었습니다.`);
}

// 절 드롭다운 업데이트 헬퍼 함수
function updateVerseDropdown(selectId, inputId, totalVerses, selectedBook, selectedChapter) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) return;
    
    let verseSelect = document.getElementById(selectId);
    
    // 드롭다운이 없으면 생성
    if (!verseSelect) {
        // 기존 input 요소 숨기기
        inputElement.style.display = 'none';
        
        // 새 select 요소 생성
        verseSelect = document.createElement('select');
        verseSelect.id = selectId;
        verseSelect.className = 'form-select';
        
        // 기존 input 다음에 삽입
        inputElement.parentNode.insertBefore(verseSelect, inputElement.nextSibling);
        
        // 이벤트 리스너 추가
        verseSelect.addEventListener('change', function() {
            // 원본 input에 값 동기화
            inputElement.value = this.value;
            
            // 구간 모드에서 시작 절이 변경되면 끝 절 최소값 조정
            if (inputId === 'start-verse') {
                const endVerseSelect = document.getElementById('end-verse-select');
                const endVerseInput = document.getElementById('end-verse');
                if (endVerseSelect && endVerseInput) {
                    const startVerse = parseInt(this.value);
                    if (startVerse && parseInt(endVerseInput.value) < startVerse) {
                        endVerseSelect.value = this.value;
                        endVerseInput.value = this.value;
                    }
                }
            }
        });
    }
    
    // 기존 옵션 모두 제거
    verseSelect.innerHTML = '';
    
    // 기본 옵션 추가
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = inputId.includes('start') ? '시작 절' : 
                                inputId.includes('end') ? '끝 절' : '절 선택';
    verseSelect.appendChild(defaultOption);
    
    // 절 옵션들 추가
    for (let verse = 1; verse <= totalVerses; verse++) {
        const option = document.createElement('option');
        option.value = verse;
        option.textContent = `${verse}절`;
        verseSelect.appendChild(option);
    }
    
    // 기본값 설정 (창세기 1장인 경우)
    if (selectedBook === '창세기' && selectedChapter === 1) {
        if (inputId === 'verse' || inputId === 'start-verse') {
            verseSelect.value = '1';
            inputElement.value = '1';
        } else if (inputId === 'end-verse') {
            verseSelect.value = '31'; // 창세기 1장은 31절까지
            inputElement.value = '31';
        }
    }
}