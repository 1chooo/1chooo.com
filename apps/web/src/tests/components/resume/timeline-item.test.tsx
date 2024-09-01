import React from 'react';
import { render, screen } from '@testing-library/react';
import TimelineItem, { TimelineItemProps } from '@/components/resume/timeline-item';
import '@testing-library/jest-dom/extend-expect';

describe('TimelineItem Component', () => {
  const mockProps: TimelineItemProps = {
    company: 'Test Company',
    location: 'Test Location',
    role: 'Test Role',
    duration: 'Test Duration',
    tasksMarkdown: '- Task 1\n- Task 2\n- Task 3',
  };

  it('should not render <ul> inside a <p> tag', () => {
    const { container } = render(<TimelineItem {...mockProps} />);
    
    // Find the <ul> element inside the rendered component
    const ulElement = container.querySelector('ul');
    
    // Ensure <ul> is not a descendant of a <p> tag
    const ulParentTag = ulElement?.parentElement?.tagName.toLowerCase();
    expect(ulParentTag).not.toBe('p');
  });

  it('should render the tasksMarkdown correctly inside a <div>', () => {
    render(<TimelineItem {...mockProps} />);

    // Check that the Markdown list is rendered correctly within the div
    const divElement = screen.getByText('Task 1').closest('div');
    expect(divElement).toBeInTheDocument();
  });
});
