# Nova Flower Website

Bu proje, Nova Flower için geliştirilmiş, ürünlerin sergilendiği ve yönetilebildiği bir web sitesidir. React (Vite) kullanılarak geliştirilmiş ve Tailwind CSS ile stillendirilmiştir.

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### 1. Bağımlılıkları Yükleme

Proje dizininde terminali açın ve gerekli paketleri yükleyin:

```bash
npm install
```

### 2. Geliştirme Modunda Çalıştırma (Frontend)

Uygulamayı geliştirme modunda çalıştırmak için:

```bash
npm run dev
```

Bu komut, Vite geliştirme sunucusunu başlatır (genellikle `http://localhost:5173`).

### 3. Production Build Almak

Uygulamayı canlı ortama hazırlamak (build almak) için:

```bash
npm run build
```

### 4. Sunucuyu Başlatmak

Express sunucusunu (backend/static file server) başlatmak için:

```bash
npm start
```

## Admin Paneli

Site, ürünlerin yönetilebildiği kapsamlı bir admin paneline sahiptir.

### Giriş
Admin paneline `/admin` rotasından erişilebilir. Giriş yapmak için kullanıcı adı ve şifre gereklidir.

### Özellikler

Admin paneli (`/admin/dashboard`) üzerinden aşağıdaki işlemler gerçekleştirilebilir:

*   **Ürün Listeleme:** Mevcut tüm çiçekler ve ürünler tablo halinde listelenir.
    *   Ürün Görseli
    *   Ürün Adı
    *   Kategori
    *   Fiyat
    *   Stok Durumu (Stok miktarına göre renk kodlu uyarılar: Kırmızı=0, Turuncu<10, Yeşil=Yeterli)
    
*   **Yeni Ürün Ekleme:**
    *   "+ Yeni Ürün Ekle" butonu ile yeni ürün eklenebilir.
    *   Gerekli Alanlar: İsim, Fiyat, Kategori, Stok, Renk, Tür, Menşei, Açıklama ve Görsel.
    *   Görsel Yükleme: Bilgisayarınızdan bir dosya seçerek görsel yükleyebilirsiniz.

*   **Ürün Düzenleme:**
    *   Listedeki ürünlerin "Düzenle" butonuna tıklayarak bilgileri güncellenebilir.
    *   Stok takibi ve fiyat güncellemeleri buradan yapılır.

*   **Ürün Silme:**
    *   "Sil" butonu ile ürünler veritabanından (veya mevcut context'ten) kaldırılabilir. İşlem öncesi onay istenir.

### Ürün Verileri
Her bir ürün için aşağıdaki detaylar saklanır:
*   **Temel Bilgiler:** İsim, Fiyat, Kategori, Stok
*   **Özellikler:** Renk, Tür (Aranjman vb.), Menşei (Yerli/İthal)
*   **Detay:** Ürün açıklaması
*   **Görsel:** Ürün fotoğrafı

## Teknoloji Yığını

*   **Frontend:** React, Vite
*   **Stil:** Tailwind CSS, Radix UI (shadcn/ui bileşenleri)
*   **Router:** React Router DOM
*   **Form Yönetimi:** React Hook Form
*   **Server:** Express.js
