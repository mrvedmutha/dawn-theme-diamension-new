/**
 * Custom Section: Jewelry Care Accordion
 * Handles accordion toggle functionality
 */

(function() {
  'use strict';

  /**
   * Initialize accordion functionality
   */
  const initAccordion = () => {
    const accordionItems = document.querySelectorAll('[data-accordion-item]');

    if (!accordionItems.length) return;

    accordionItems.forEach((item) => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      const content = item.querySelector('[data-accordion-content]');

      if (!trigger || !content) return;

      // Set initial max-height for open items
      if (item.classList.contains('is-active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }

      trigger.addEventListener('click', () => {
        handleAccordionClick(item, accordionItems);
      });
    });
  };

  /**
   * Handle accordion item click
   * @param {HTMLElement} clickedItem - The accordion item that was clicked
   * @param {NodeList} allItems - All accordion items
   */
  const handleAccordionClick = (clickedItem, allItems) => {
    const isActive = clickedItem.classList.contains('is-active');
    const clickedContent = clickedItem.querySelector('[data-accordion-content]');
    const clickedTrigger = clickedItem.querySelector('[data-accordion-trigger]');

    // Close all other items
    allItems.forEach((item) => {
      if (item !== clickedItem) {
        closeAccordionItem(item);
      }
    });

    // Toggle clicked item
    if (isActive) {
      closeAccordionItem(clickedItem);
    } else {
      openAccordionItem(clickedItem);
    }
  };

  /**
   * Open an accordion item
   * @param {HTMLElement} item - The accordion item to open
   */
  const openAccordionItem = (item) => {
    const content = item.querySelector('[data-accordion-content]');
    const trigger = item.querySelector('[data-accordion-trigger]');

    if (!content || !trigger) return;

    item.classList.add('is-active');
    trigger.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = content.scrollHeight + 'px';
  };

  /**
   * Close an accordion item
   * @param {HTMLElement} item - The accordion item to close
   */
  const closeAccordionItem = (item) => {
    const content = item.querySelector('[data-accordion-content]');
    const trigger = item.querySelector('[data-accordion-trigger]');

    if (!content || !trigger) return;

    item.classList.remove('is-active');
    trigger.setAttribute('aria-expanded', 'false');
    content.style.maxHeight = '0';
  };

  /**
   * Recalculate max-height on window resize
   * Ensures accordion content displays correctly after resize
   */
  const handleResize = () => {
    const activeItems = document.querySelectorAll('[data-accordion-item].is-active');

    activeItems.forEach((item) => {
      const content = item.querySelector('[data-accordion-content]');
      if (content) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  };

  /**
   * Debounce function to limit resize event calls
   * @param {Function} func - Function to debounce
   * @param {number} delay - Delay in milliseconds
   */
  const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', initAccordion);

  // Handle window resize with debounce
  window.addEventListener('resize', debounce(handleResize, 300));

  // Re-initialize after Shopify section editor updates
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', initAccordion);
    document.addEventListener('shopify:section:reorder', initAccordion);
  }

})();
