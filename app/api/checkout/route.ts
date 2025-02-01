import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

interface LineItem {
  name: string;
  price: number;
  image: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: LineItem) => ({
        price_data: {
          currency: 'pkr',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round (item.price * 100),
        },
        quantity:1,
      })),

      mode: 'payment',
      success_url: "http://localhost:3000/success",
      cancel_url:  "http://localhost:3000/cancle",
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
} 