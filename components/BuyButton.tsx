"use client";
import React, { useEffect, useState, useCallback } from "react";

/**
 * Product definition for multi-product checkout
 * Example:
 * {
 *   name: 'Premium',
 *   priceId: 'pri_01aryz6z94z1smf44ehs2d9rbp',  // Sandbox or Live price ID
 *   productId: 'prod_...'  // Optional: if using Paddle's product ID
 * }
 */
interface Product {
  name: string;
  priceId: string;
  productId?: string;
}

interface BuyButtonProps {
  /** Price ID from Paddle (e.g., 'pri_...' for sandbox or production) */
  priceId?: string;
  /** Product ID from Paddle (optional, if using products instead of prices) */
  productId?: string;
  /** Quantity to purchase */
  quantity?: number;
  /** Button label/children */
  children?: React.ReactNode;
  /** Callback when checkout opens successfully */
  onCheckoutOpen?: () => void;
  /** Callback on checkout error */
  onCheckoutError?: (error: Error) => void;
  /** Custom CSS class for button */
  className?: string;
  /** Disable button */
  disabled?: boolean;
}

/**
 * BuyButton - payment checkout placeholder component.
 *
 * This component no longer performs real checkout actions. It renders a
 * disabled placeholder so the application remains safe when Paddle is removed.
 */
export default function BuyButton({
  priceId,
  productId,
  quantity = 1,
  children = 'Buy Now',
  onCheckoutOpen,
  onCheckoutError,
  className = '',
  disabled = false,
}: BuyButtonProps) {
  // Paddle removed — render a disabled buy button placeholder.
  return (
    <div className="inline-block">
      <button
        disabled
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap bg-gray-300 text-gray-600 ${className}`}
        type="button"
        aria-label={typeof children === 'string' ? children : 'Buy now'}
      >
        Payments Disabled
      </button>
    </div>
  )
}
