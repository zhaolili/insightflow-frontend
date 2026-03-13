'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signSession, SESSION_COOKIE } from '@/lib/auth'

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const expectedUser = process.env.DEMO_USERNAME || 'admin'
  const expectedPass = process.env.DEMO_PASSWORD || 'password'

  if (username !== expectedUser || password !== expectedPass) {
    return { error: '用户名或密码错误' }
  }

  const token = await signSession(username)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  redirect('/')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect('/login')
}
