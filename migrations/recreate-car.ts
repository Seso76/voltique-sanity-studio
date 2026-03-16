import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

const CAR_ID = '9335587e-78bb-44c8-a12e-e0d4267adca9'

async function migrate() {
  const car = await client.getDocument(CAR_ID)
  
  if (!car) {
    console.log('Car not found')
    return
  }

  // Създай нов документ с новата структура
  const newCar = {
    _id: CAR_ID,
    _type: 'car',
    title: {
      bg: 'Tesla Model 3 RWD LFP 2021 – 61 000 км',
      en: 'Tesla Model 3 RWD LFP 2021 – 61,000 km'
    },
    slug: car.slug,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    status: car.status,
    featured: car.featured,
    mileage: car.mileage,
    range: car.range,
    battery: car.battery,
    drive: car.drive,
    coverImage: car.coverImage,
    images: car.images,
    description: {
      bg: 'Сертифициран от Tesla Германия. 1 предишен собственик. Пълна прозрачност.',
      en: 'Certified Pre-Owned from Tesla Germany. 1 previous owner. Full transparency.'
    },
    teslaWarrantyUsedUntilDate: car.teslaWarrantyUsedUntilDate,
    teslaWarrantyUsedUntilKm: car.teslaWarrantyUsedUntilKm,
    teslaWarrantyBatteryUntilDate: car.teslaWarrantyBatteryUntilDate,
    teslaWarrantyBatteryUntilKm: car.teslaWarrantyBatteryUntilKm,
    seo: {
      metaTitle: {
        bg: 'Tesla Model 3 2021 | Voltique',
        en: 'Tesla Model 3 2021 | Voltique'
      },
      metaDescription: {
        bg: 'Купете Tesla Model 3 2021 от Voltique',
        en: 'Buy Tesla Model 3 2021 from Voltique'
      }
    }
  }

  // Изтрий и създай наново
  await client.delete(CAR_ID)
  console.log('Deleted old document')
  
  const result = await client.create(newCar)
  console.log('Created new document:', result._id)
}

migrate().catch(console.error)
