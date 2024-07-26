import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toolbox from './Toolbox';

describe("LGTM Button...", async () => {
    const MOCK_REPO = 1;
    const MOCK_ISSUE_NUMBER = 1;
    
    beforeEach(async () => {
        render(<Toolbox
            dispatchModals={vi.fn()}
            onCreateComment={vi.fn()}
            repo={MOCK_REPO}
            issue_number={MOCK_ISSUE_NUMBER}
            handleStartRecording={vi.fn()}
        />)

        const speedDial = screen.getByRole("button", { name: "SpeedDial basic example" });
        await userEvent.hover(speedDial);
    })

    it("initially has thumbs up icon", () => {
        expect(screen.getByRole("menuitem", { name: "Looks good to me!" })).toBeInTheDocument();
    })

    it("changes from thumbs up icon to celebration icon", async () => {
        const button = screen.getByRole("menuitem", { name: "Looks good to me!" });

        await userEvent.click(button);

        expect(screen.getByRole("menuitem", { name: "Confetti!" })).toBeInTheDocument();

    })
})