import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

const CAR_ID = '9335587e-78bb-44c8-a12e-e0d4267adca9'

async function migrate() {
  const car = await client.getDocument(CAR_ID)
  
  if (!car) {
    console.log('Car not found')
    return
  }
  
  console.log('Current car:', JSON.stringify(car, null, 2))
  
  const result = await client
    .patch(CAR_ID)
    .set({
      'title.bg': '2021 Tesla Model 3',
      'title.en': '2021 Tesla Model 3',
      'description.bg': 'Електрически седан с голям пробег и отлично състояние.',
      'description.en': 'Electric sedan with great range and excellent condition.',
      'seo.metaTitle.bg': '2021 Tesla Model 3 | Voltique',
      'seo.metaTitle.en': '2021 Tesla Model 3 | Voltique',
      'seo.metaDescription.bg': 'Купете 2021 Tesla Model 3 от Voltique',
      'seo.metaDescription.en': 'Buy 2021 Tesla Model 3 from Voltique'
    })
    .unset(['titleI18n', 'badge', 'certified', 'gallery', 'vehicle', 'warranty'])
    .commit()

  console.log('Car migrated:', result._id)
}

migrate().catch(console.error)
