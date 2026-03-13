(function() {
  'use strict';

  const initAccordion = () => {
    const accordionItems = document.querySelectorAll('[data-accordion-item]');

    if (!accordionItems.length) return;

    accordionItems.forEach((item) => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      const content = item.querySelector('[data-accordion-content]');

      if (!trigger || !content) return;

      if (item.classList.contains('is-active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }

      trigger.addEventListener('click', () => {
        handleAccordionClick(item, accordionItems);
      });
    });
  };

  const handleAccordionClick = (clickedItem, allItems) => {
    const isActive = clickedItem.classList.contains('is-active');
    const clickedContent = clickedItem.querySelector('[data-accordion-content]');
    const clickedTrigger = clickedItem.querySelector('[data-accordion-trigger]');

    allItems.forEach((item) => {
      if (item !== clickedItem) {
        closeAccordionItem(item);
      }
    });

    if (isActive) {
      closeAccordionItem(clickedItem);
    } else {
      openAccordionItem(clickedItem);
    }
  };

  const openAccordionItem = (item) => {
    const content = item.querySelector('[data-accordion-content]');
    const trigger = item.querySelector('[data-accordion-trigger]');

    if (!content || !trigger) return;

    item.classList.add('is-active');
    trigger.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = content.scrollHeight + 'px';
  };

  const closeAccordionItem = (item) => {
    const content = item.querySelector('[data-accordion-content]');
    const trigger = item.querySelector('[data-accordion-trigger]');

    if (!content || !trigger) return;

    item.classList.remove('is-active');
    trigger.setAttribute('aria-expanded', 'false');
    content.style.maxHeight = '0';
  };

  const handleResize = () => {
    const activeItems = document.querySelectorAll('[data-accordion-item].is-active');

    activeItems.forEach((item) => {
      const content = item.querySelector('[data-accordion-content]');
      if (content) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  };

  const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  document.addEventListener('DOMContentLoaded', initAccordion);

  window.addEventListener('resize', debounce(handleResize, 300));

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', initAccordion);
    document.addEventListener('shopify:section:reorder', initAccordion);
  }

})();
