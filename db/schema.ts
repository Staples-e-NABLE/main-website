import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core'



export const VOLUNTEER_STATUSES = ['new', 'contacted', 'active', 'inactive'] as const

export const REQUEST_STATUSES = [
  'new',
  'in_review',
  'matched',
  'printing',
  'completed',
  'declined',
] as const



export const requests = pgTable('requests', {
  id: serial().primaryKey(),
  recipientName: text('recipient_name').notNull(),
  age: text('age').notNull(),
  requesterRelationship: text('requester_relationship').notNull().default(''),
  email: text('email').notNull(),
  phone: text('phone').notNull().default(''),
  address: text('address').notNull().default(''),
  city: text('city').notNull().default(''),
  state: text('state').notNull().default(''),
  zip: text('zip').notNull().default(''),
  limbSide: text('limb_side').notNull().default(''),
  limbType: text('limb_type').notNull().default(''),
  causeOfDifference: text('cause_of_difference').notNull().default(''),
  measurements: text('measurements').notNull().default(''),
  story: text('story').notNull().default(''),
  status: text('status').notNull().default('new'),
  adminNotes: text('admin_notes').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const requestPhotos = pgTable('request_photos', {
  id: serial().primaryKey(),
  requestId: integer('request_id')
    .notNull()
    .references(() => requests.id, { onDelete: 'cascade' }),
  blobKey: text('blob_key').notNull(),
  filename: text('filename').notNull().default(''),
  contentType: text('content_type').notNull().default('application/octet-stream'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})



export const volunteers = pgTable('volunteers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  volunteerStatus: text('volunteer_status').notNull(),
  schoolEmail: text('school_email').notNull(),
  homeEmail: text('home_email').notNull(),
  phoneNumber: text('phone_number').default(''),
  grade: text('grade').default(''),
  experience: text('experience').default(''),
  intention: text('intention').notNull(),
  status: text('status').default('new').notNull(),
  adminNotes: text('admin_notes').default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const galleryDevices = pgTable('gallery_devices', {
  id: serial().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull().default(''),
  recipientFirstName: text('recipient_first_name').notNull().default(''),
  blobKey: text('blob_key').notNull(),
  contentType: text('content_type').notNull().default('image/jpeg'),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
